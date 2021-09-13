const path = require('path')
const changeCase = require('change-case')
const Generator = require('yeoman-generator')
const gitUserInfo = require('../../utils/git-user-info')()

const options = {
  projectDescription: {
    type: 'input',
    default: 'Generated by rjmunhoz yeoman generator',
    message: 'Description'
  },
  authorName: {
    type: 'input',
    default: gitUserInfo.name,
    message: 'Name of the author'
  },
  authorEmail: {
    type: 'input',
    default: gitUserInfo.email,
    message: 'Email of the author'
  },
  enableDeclarations: {
    type: 'confirm',
    default: false,
    message: 'Enable typescript declaration files?'
  }
}

const _arguments = {
  projectName: {
    type: 'input',
    required: false,
    default: (context) => path.basename(process.cwd())
  }
}

function stringToType (type) {
  const stringTypeMap = {
    input: String,
    confirm: Boolean
  }

  return stringTypeMap[type] || String
}

class RjmunhozGenerator extends Generator {
  constructor (args, opts) {
    super(args, opts)
    for (const [argumentName, argument] of Object.entries(_arguments)) {
      this.argument(argumentName, { type: stringToType(argument.type), required: argument.required })
    }

    for (const [optionName, option] of Object.entries(options)) {
      this.option(optionName, { type: stringToType(option.type), required: option.required })
    }
  }

  async prompting () {
    const prompts = Object.entries({ ..._arguments, ...options })
      .map(([name, config]) => {
        return {
          name,
          when: () => this.options[name] === undefined,
          ...config
        }
      })

    const answers = await this.prompt(prompts)
    this.values = { ...this.options, ...answers }
  }

  writing () {
    const context = {
      ...changeCase,
      ...this.values
    }

    const files = [
      '.github/workflows/lint-and-test.yml',
      '.husky/commit-msg',
      '.husky/prepare-commit-msg',
      '.husky/pre-commit',
      '.husky/pre-push',
      'test/not-implemented.ts',
      'Dockerfile',
      'package.json',
      'tsconfig.json'
    ]

    const dotFiles = [
      'editorconfig',
      'eslintignore',
      'eslintrc.js',
      'gitignore',
      'prettierrc'
    ]

    for (const file of files) {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        context
      )
    }

    for (const dotFile of dotFiles) {
      this.fs.copyTpl(
        this.templatePath(dotFile),
        this.destinationPath(`.${dotFile}`)
      )
    }

    if (this.values.enableDeclarations) {
      const tsconfig = {
        compilerOptions: {
          declaration: true,
          declarationMap: true
        }
      }

      this.fs.extendJSON(this.destinationPath('tsconfig.json'), tsconfig)
    }
  }
}

module.exports = RjmunhozGenerator
