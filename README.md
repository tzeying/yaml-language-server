 [![version](https://img.shields.io/npm/v/yaml-language-service.svg)](https://www.npmjs.com/package/yaml-language-service) 

# YAML Language Service built with Webpack 

Forked from [YAML language server](https://github.com/redhat-developer/yaml-language-server). Supports JSON Schema 7 and below.

This fork allows the library to be consumed directly within a JS environment, specifically within [create-react-app](https://github.com/facebook/create-react-app). 

While you are able to inject the `getLanguageService` function directly into any app, to use it with the [Monaco Editor](https://github.com/microsoft/monaco-editor), it has to be paired with the [Monaco Language Client](https://github.com/TypeFox/monaco-languageclient). 

If you're looking to incorporate YAML support with your web-based monaco editor, the following setup has worked nicely for me: 
- [monaco-react](https://github.com/suren-atoyan/monaco-react): I've managed to successfully integrate the `monaco-languageclient` without ejection. 
- [monaco-languageclient](https://github.com/TypeFox/monaco-languageclient)


### Notable changes to the library 
I have added `webpack.config.js` so that the build produces a bundle consummable by `create-react-app`'s webpack build. This entailed the incorporation of: 
- `umd-compat-loader` to handle UMD modules so that Webpack doesn't error out. [Errors are known and documented but unsolved.](https://github.com/eclipse-theia/theia/issues/1232)
```js 
{
  test: /node_modules[\\|/](jsonc-parser|vscode-json-languageservice)/,
  use: 'umd-compat-loader' 
}
```
- Core nodeJS dependencies excluded so that the library can run on the web
```js 
fallback: {
  "path": false,
  "buffer": false,
  "fs": false
}

plugins: [new dotenv()]
```
- Switched to standalone version of prettier to prevent build from erroring out unnecessarily (in `yamlFormatter.ts`)
```js 
import * as prettier from 'prettier/standalone';
```

On top of the webpack configurations, changes were made to the `getSchemaForResource` function (which is part of the `yamlSchemaService`). The following line is added to ensure that the URI is being formatted correctly for parsing:  
```js 
URI.parse(resource).with({ fragment: null, query: null }).toString();
```

### Other features, using it as a language server 
To learn more about the complete feature set, please refer to [YAML language server README](https://github.com/redhat-developer/yaml-language-server).