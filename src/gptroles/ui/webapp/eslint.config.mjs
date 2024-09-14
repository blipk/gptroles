import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import reactPlugin from "eslint-plugin-react"
import reactRefresh from "eslint-plugin-react-refresh"
import tsdoceslint from "eslint-plugin-tsdoc"
import * as globals from "globals"


export default tseslint.config(

    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylistic,
    ...[
        {
            files   : [ "**/*.{js,jsx,mjs,cjs,ts,tsx}" ],
            plugins : {

			    "react"         : reactPlugin,
			    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			    "react-refresh" : reactRefresh,

                "tsdoc": tsdoceslint
            },
            languageOptions: {
                parserOptions: {
                    project        : true,
                    projectService : {
                        allowDefaultProject: [ "*.mjs", "*.ts", "*.tsx" ],
                    },

                    tsconfigRootDir : import.meta.dirname,
                    ecmaFeatures    : {
                        jsx: true,
                    },
                },
                globals: {
                    ...globals.browser,
                },
            },
            rules: {
                // eslint
                "indent"                    : [ "error", 4 ],
                "semi"                      : [ "error", "never" ],
                "eqeqeq"                    : [ "error", "always" ],
                "space-in-parens"           : [ "error", "always" ],
                "array-bracket-spacing"     : [ "error", "always" ],
                "object-curly-spacing"      : [ "error", "always" ],
                "computed-property-spacing" : [ "error", "always", { "enforceForClassMembers": true } ],
                "no-underscore-dangle"      : [ "warn" ],
                "key-spacing"               : [
                    "error",
                    {
                        align: {
                            beforeColon : true,
                            afterColon  : true,
                            on          : "colon",
                        },
                    },
                ],
                "no-multi-spaces"    : [ "error", { exceptions: { VariableDeclarator: true } } ],
                "func-names"         : [ "error", "as-needed" ],
                "default-param-last" : "error",
                "quotes"             : [ "error", "double" ],
                "max-len"            : [ "error", { code: 150 } ],
                "camelcase"          : [
                    "error",
                    {
                        ignoreImports       : true,
                        ignoreDestructuring : true,
                        properties          : "never",
                        allow               : [ "__" ],
                    },
                ],
                "dot-notation"         : [ "error", { "allowPattern": "^[a-z]+(_[a-z]+)+$" } ],
                "no-array-constructor" : "error",

                // typescript-eslint
                "@/semi"                            : [ "error", "never" ],
                "@/quotes"                          : [ "error", "double" ],
                "@typescript-eslint/no-unused-vars" : [
                    "error",
                    {
                        args                           : "all",
                        argsIgnorePattern              : "^_",
                        caughtErrors                   : "all",
                        caughtErrorsIgnorePattern      : "^_",
                        destructuredArrayIgnorePattern : "^_",
                        varsIgnorePattern              : "^_",
                    },
                ],
                "@typescript-eslint/no-explicit-any"                 : "error",
                "@typescript-eslint/no-non-null-assertion"           : "error",
                "@typescript-eslint/no-confusing-non-null-assertion" : "error",
                "@typescript-eslint/no-empty-function"               : "error",
                "@typescript-eslint/array-type"                      : [ "error", { default: "array-simple" } ],
                "@typescript-eslint/await-thenable"                  : "error",
                "@typescript-eslint/consistent-generic-constructors" : [ "error", "constructor" ],
                "@typescript-eslint/consistent-type-exports"         : "error",
                "@typescript-eslint/consistent-type-imports"         : [ "error", { "prefer": "type-imports", "fixStyle": "separate-type-imports" } ],
                "@typescript-eslint/default-param-last"              : "error",
                "@typescript-eslint/dot-notation"                    : [ "error", { "allowPattern": "^[a-z]+(_[a-z]+)+$" } ],
                // "@typescript-eslint/explicit-function-return-type"   : "error",
                "@typescript-eslint/explicit-module-boundary-types"  : "error",
                "@typescript-eslint/no-array-constructor"            : "error",
                "@typescript-eslint/no-array-delete"                 : "error",
                "@typescript-eslint/restrict-template-expressions"   : [ "error", { "allowNumber": true } ],
                "@typescript-eslint/unbound-method"                  : [ "error", { ignoreStatic: true } ],

                // tsdoc
                "tsdoc/syntax": "warn",


                // eslint-plugin-react
                "react/jsx-indent"       : [ "error", 4 ],
                "react/jsx-indent-props" : [ "error", 4 ],

                //eslint-plugin-react-refresh
                "react-refresh/only-export-components": [ "warn", { allowConstantExport: true } ],
            },
        },
        {
            ignores: [ "**/node_modules/**", "**/docs/**", "**/dist/**", "**/*/qwebchannel.js" ],
        }
    ]
)

