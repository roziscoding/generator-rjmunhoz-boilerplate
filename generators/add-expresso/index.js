const path = require('path')
const changeCase = require('change-case')
const Generator = require('yeoman-generator')
const gitUserInfo = require('../../utils/git-user-info')()

const options = (generator) => {
  const authorName = generator.packageJson.get('author').split(' ')[0]
  const authorEmail = generator.packageJson
    .get('author')
    .split(' ')[1]
    .replace('<', '')
    .replace('>', '')
  const licenseName = generator.packageJson.get('license')
  const licenseUrl = `https://spdx.org/licenses/${licenseName}-only.html`

  return {
    apiName: {
      type: 'input',
      default: 'Expresso API',
      message: 'API Name'
    },
    apiVersion: {
      type: 'input',
      default: '1.0.0',
      message: 'API Version'
    },
    apiDescription: {
      type: 'input',
      default: 'API created using the expresso boilerplate and libraries',
      message: 'API Description'
    },
    authorName: {
      type: 'input',
      default: authorName,
      message: 'Author Name'
    },
    authorEmail: {
      type: 'input',
      default: authorEmail,
      message: 'Author Email'
    },
    licenseName: {
      type: 'input',
      default: licenseName,
      message: 'License Name'
    },
    licenseUrl: {
      type: 'input',
      default: licenseUrl,
      message: 'License URL'
    }
  }
}

function stringToType(type) {
  const stringTypeMap = {
    input: String,
    confirm: Boolean
  }

  return stringTypeMap[type] || String
}

class AddExpressoGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts)

    for (const [optionName, option] of Object.entries(options)) {
      this.option(optionName, {
        type: stringToType(option.type),
        required: option.required
      })
    }
  }

  async prompting () {
    const prompts = Object.entries(options(this)).map(([name, config]) => {
      return {
        name,
        when: () => this.options[name] === undefined,
        ...config
      }
    })

    const answers = await this.prompt(prompts)
    this.values = { ...this.options, ...answers }
  }

  async writing() {
    const context = {
      ...changeCase,
      ...this.values
    }

    await this.addDependencies([
      '@expresso/app',
      '@expresso/router',
      '@expresso/errors',
      '@expresso/server'
    ])

    await this.addDevDependencies(['ts-node-dev'])

    const files = [
      'src/index.ts',
      'src/app.config.ts',
      'src/presentation/app.ts',
      'src/presentation/server.ts',
      'src/presentation/endpoints/dummy.ts',
      'src/presentation/endpoints/index.ts'
    ]

    for (const file of files) {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        context
      )
    }
  }
}

module.exports = AddExpressoGenerator
