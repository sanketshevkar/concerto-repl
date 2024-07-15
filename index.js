const { ModelManager, DecoratorManager } = require('@accordproject/concerto-core');
const { Printer } = require('@accordproject/concerto-cto');
const newFunction = function() {
    try {
        // create the model manager, used to manage a consistent set of
        // related models
        const mm = new ModelManager({enableMapType: true});
    
        // add a CTO file (as a string) to the model manager
        mm.addModel(`namespace test@1.0.0
    
    scalar SSN extends String
    
    @Editable
    concept Person {
        @Custom
        o String firstName
        o String lastName
        o String bio
        o SSN ssn
        o String address1
        o String address2
        o String city
        o String country
        o Integer zip
        o Dictionary dictionary
    }
    
    map Dictionary {
        o String 
        o String
    }
    
    map Rolodex {
        o String 
        o String
    }`);
    
        // create a decorator command set:
        // 1. It a command to add the @PII decorator to any properties 
        // with the name 'ssn'.
        // 2. Any properties of type 'Object' get the @Hide decorator applied
        // Properties can be targeted by [namespace].[concept].[propertyName] 
        // or even by type
        const dcms = {
            "$class" : "org.accordproject.decoratorcommands@0.3.0.DecoratorCommandSet",
            "name" : "web",
            "version": "1.0.0",
            "commands" : [
                {
                    "$class" : "org.accordproject.decoratorcommands@0.3.0.Command",
                    "type" : "UPSERT",
                    "target" : {
                        "$class" : "org.accordproject.decoratorcommands@0.3.0.CommandTarget",
                        "type" : "concerto.metamodel@1.0.0.StringProperty"
                    },
                    "decorator" : {
                        "$class" : "concerto.metamodel@1.0.0.Decorator",
                        "name" : "Form",
                        "arguments" : [
                            {
                                "$class" : "concerto.metamodel@1.0.0.DecoratorString",
                                "value" : "inputType"
                            },
                            {
                                "$class" : "concerto.metamodel@1.0.0.DecoratorString",
                                "value" : "text"
                            }
                        ]
                    }
                },
                {
                    "$class" : "org.accordproject.decoratorcommands@0.3.0.Command",
                    "type" : "APPEND",
                    "target" : {
                        "$class" : "org.accordproject.decoratorcommands@0.3.0.CommandTarget",
                        "type" : "concerto.metamodel@1.0.0.StringProperty"
                    },
                    "decorator" : {
                        "$class" : "concerto.metamodel@1.0.0.Decorator",
                        "name" : "New",
                        "arguments" : []
                    }
                },
                {
                    "$class" : "org.accordproject.decoratorcommands@0.3.0.Command",
                    "type" : "UPSERT",
                    "target" : {
                        "$class" : "org.accordproject.decoratorcommands@0.3.0.CommandTarget",
                        "namespace" : "test@1.0.0",
                        "declaration" : "Person",
                        "property" : "bio"
                    },
                    "decorator" : {
                        "$class" : "concerto.metamodel@1.0.0.Decorator",
                        "name" : "Form",
                        "arguments" : [
                            {
                                "$class" : "concerto.metamodel@1.0.0.DecoratorString",
                                "value" : "inputType"
                            },
                            {
                                "$class" : "concerto.metamodel@1.0.0.DecoratorString",
                                "value" : "textArea"
                            }
                        ]
                    }
                },
                {
                    "$class" : "org.accordproject.decoratorcommands@0.3.0.Command",
                    "type" : "UPSERT",
                    "target" : {
                        "$class" : "org.accordproject.decoratorcommands@0.3.0.CommandTarget",
                        "namespace" : "test",
                        "declaration" : "Person",
                        "property" : "bio"
                    },
                    "decorator" : {
                        "$class" : "concerto.metamodel@1.0.0.Decorator",
                        "name" : "UnversionedNamespace",
                        "arguments" : []
                    }
                },
                {
                    "$class" : "org.accordproject.decoratorcommands@0.3.0.Command",
                    "type" : "UPSERT",
                    "target" : {
                        "$class" : "org.accordproject.decoratorcommands@0.3.0.CommandTarget",
                        "namespace" : "test@1.0.0",
                        "declaration" : "SSN"
                    },
                    "decorator" : {
                        "$class" : "concerto.metamodel@1.0.0.Decorator",
                        "name" : "PII",
                        "arguments" : [
                        ]
                    }
                },
                {
                    "$class" : "org.accordproject.decoratorcommands@0.3.0.Command",
                    "type" : "UPSERT",
                    "target" : {
                        "$class" : "org.accordproject.decoratorcommands@0.3.0.CommandTarget",
                        "namespace" : "test",
                        "declaration" : "Person",
                        "property" : "address1"
                    },
                    "decorator" : {
                        "$class" : "concerto.metamodel@1.0.0.Decorator",
                        "name" : "Address",
                        "arguments" : []
                    }
                },
                {
                    "$class" : "org.accordproject.decoratorcommands@0.3.0.Command",
                    "type" : "UPSERT",
                    "target" : {
                        "$class" : "org.accordproject.decoratorcommands@0.3.0.CommandTarget",
                        "namespace" : "test",
                        "declaration" : "Person",
                        "property" : "country",
                        "type" : "concerto.metamodel@1.0.0.StringProperty"
                    },
                    "decorator" : {
                        "$class" : "concerto.metamodel@1.0.0.Decorator",
                        "name" : "Address",
                        "arguments" : []
                    }
                },
                {
                    "$class" : "org.accordproject.decoratorcommands@0.3.0.Command",
                    "type" : "UPSERT",
                    "target" : {
                        "$class" : "org.accordproject.decoratorcommands@0.3.0.CommandTarget",
                        "namespace" : "test",
                        "declaration" : "Person",
                        "type" : "concerto.metamodel@1.0.0.StringProperty",
                        "properties" : ["address2", "zip"]
                    },
                    "decorator" : {
                        "$class" : "concerto.metamodel@1.0.0.Decorator",
                        "name" : "Address",
                        "arguments" : []
                    }
                },
                {
                    "$class" : "org.accordproject.decoratorcommands@0.3.0.Command",
                    "type" : "UPSERT",
                    "target" : {
                        "$class" : "org.accordproject.decoratorcommands@0.3.0.CommandTarget",
                        "namespace" : "test",
                        "declaration" : "Person",
                        "properties" : ["city"]
                    },
                    "decorator" : {
                        "$class" : "concerto.metamodel@1.0.0.Decorator",
                        "name" : "Address",
                        "arguments" : []
                    }
                }
            ]
        };
    
        // const namespaceDcs = {
        //     "$class": "org.accordproject.decoratorcommands@0.3.0.DecoratorCommandSet",
        //     "name": "web",
        //     "version": "1.0.0",
        //     "commands": [
        //         {
        //             "$class": "org.accordproject.decoratorcommands@0.3.0.Command",
        //             "type": "UPSERT",
        //             "target": {
        //                 "$class": "org.accordproject.decoratorcommands@0.3.0.CommandTarget",
        //                 "namespace": "test@1.0.0",
        //                 "mapElement": 'KEY_VALUE'
        //             },
        //             "decorator": {
        //                 "$class": "concerto.metamodel@1.0.0.Decorator",
        //                 "name": "Form",
        //                 "arguments": [
        //                     {
        //                         "$class": "concerto.metamodel@1.0.0.DecoratorString",
        //                         "value": "inputType"
        //                     },
        //                     {
        //                         "$class": "concerto.metamodel@1.0.0.DecoratorString",
        //                         "value": "text"
        //                     }
        //                 ]
        //             }
        //         }
        //     ]
        // };
    
        // apply to the model
        // note that both syntactic and semantic validation of the decorator command set is enabled
        const newModelManager = DecoratorManager.decorateModels(mm, dcms, { validate: true, validateCommands: true });
    
        // get the type declaration for the data
        const typeDeclaration = newModelManager.getType('test@1.0.0.SSN');
    
        // print the decorated model as a CTO string
        const modelAst = typeDeclaration.getModelFile().getAst();
        const decoratedCto = Printer.toCTO(modelAst);
        console.log('Model with decorator command set applied:');
        console.log(decoratedCto);
    }
    catch (err) {
        console.log(err)
    }
}

newFunction();
