# ts2reason

Automatic generation of ReasonML bindings using TypeScript definitions.

> ** THIS IS A WORK IN PROGRESS PROJECT **

I just started to learn ReasonML and something that I'm missing is the ability to find definitions for popular javascript libraries as we have for TypeScript on DefinitelyTyped.

Inspired by the [ts2fable](https://github.com/fable-compiler/ts2fable) project, my ambition with this project is to create a tool to generate ReasonML bindings from TypeScript definition.

Do not expect to find something usable now, but feel free to [contribute](https://github.com/Diullei/ts2reason/issues/1) :)

## Spec - TypeScript conversion to ReasonML

This section contains the specification of the conversions that should be applied in order to represent the TypeScript definition as a ReasonML binding.

### TypeScript grammar

> This grammar will be extended as new features are implemented

```
 Status | Feature
 -------+--------
        |
 [    ] | TypeAliasDeclaration:
 [    ] |     'type' BindingIdentifier TypeParameters? '=' Type ';'
        |
 [    ] | Type:
 [    ] |     Union
 [    ] |     Intersection
 [    ] |     PrimaryType
 [    ] |     FunctionType
 [    ] |     ConstructorType
        |
 [    ] | PrimaryType:
 [    ] |     ParenthesizedType
 [done] |     PredefinedType
 [    ] |     TypeReference
 [    ] |     ObjectType
 [done] |     ArrayType
 [done] |     TupleType
 [    ] |     TypeQuery
 [    ] |     ThisType
        |
 [done] | PredefinedType:
 [done] |     'any'
 [done] |     'number'
 [done] |     'boolean'
 [done] |     'string'
 [done] |     'symbol'
 [done] |     'void'
 [done] |     'null'
 [done] |     'undefined'
 [done] |     'never'
 [done] |     'object'
 [done] |     'bigint'
        |
 [    ] | AmbientDeclaration:
 [done] |     'declare' AmbientVariableDeclaration
 [done] |     'declare' AmbientFunctionDeclaration
 [    ] |     'declare' AmbientClassDeclaration
 [    ] |     'declare' AmbientEnumDeclaration
 [    ] |     'declare' AmbientNamespaceDeclaration
        |
 [done] | AmbientVariableDeclaration:
 [done] |     'var' AmbientBindingList ';'
 [done] |     'let' AmbientBindingList ';'
 [done] |     'const' AmbientBindingList ';'
        |
 [done] | AmbientBindingList:
 [done] |     AmbientBinding
 [done] |     AmbientBindingList ',' AmbientBinding
        |
 [done] | AmbientBinding:
 [done] |     BindingIdentifier TypeAnnotation?
        |
 [done] | AmbientFunctionDeclaration:
 [done] |     'function' BindingIdentifier CallSignature ';'
        |
 [done] | CallSignature:
 [done] |     TypeParameter? '(' ParameterList? ')' TypeAnnotation?
        |
 [    ] | AmbientEnumDeclaration:
 [    ] |    EnumDeclaration
        |
 [WIP.] | EnumDeclaration:
 [    ] |     'const'? 'enum' BindingIdentifier '{' EnumBody? '}'
        |
 [    ] | EnumBody:
 [    ] |     EnumMemberList ',' ?
        |
 [    ] | EnumMemberList:
 [    ] |     EnumMember
 [    ] |     EnumMemberList ',' EnumMember
        |
 [    ] | EnumMember:
 [    ] |     PropertyName
 [    ] |     PropertyName '=' EnumValue
        |
 [    ] | EnumValue:
 [    ] |     AssignmentExpression
```

### Type alias declaration binding a predefined type

```
TypeAliasDeclaration:
    'type' BindingIdentifier '=' PredefinedType ';' 
```

Performs a simple binding of the javascript primitive types: `any`, `number`, `boolean`, `string`, `symbol` and `void`.

Example of a TypeScript declaration:

````typescript
type MyNameType = string;
````

Example of a ReasonML equivalent:

````reason
module MyNameType = {
    type t = string;
}
````

#### The "any" type

In TypeScript, the `any` type is used to describe dynamic values. To represent that type in a `PredefinedType` declaration on ReasonML we can use a generic type:

Example of a TypeScript declaration:

````typescript
type MyObjType = any;
````

Example of a ReasonML equivalent:

````reason
module MyObjType = {
    type t = 'any;
}
````

#### The "void" type

In TypeScript, `void` represents the absence of having a type. It's commonly used as the return type of functions that do not return a value. The equivalent in ReasonML is the `unit` type.

Example of a TypeScript declaration:

````typescript
type MyObjType = void;
````

Example of a ReasonML equivalent:

````reason
module MyObjType = {
    type t = unit;
}
````

#### Types: "symbol", "null", "undefined", "object" and "biting"

The types `symbol`, `null`, `undefined` and `object` wull follow the following conversion:

 - `symbol` -> `Js.Types.symbol`
 - `null` -> `Js.Types.null_val`
 - `undefined` -> `Js.Types.undefined_val`
 - `object` -> `Js.Types.obj_val`
 - `biting` -> `Int64.t`

#### The "never" type

In TypeScript, the `never` type represents the type of values that never occur. For now we will use the `unit` type to represent it in ReasonML.

Example of a TypeScript declaration:

````typescript
type MyObjType = never;
````

Example of a ReasonML equivalent:

````reason
module MyObjType = {
    type t = unit;
}
````

### Type alias declaration binding an array type

```
TypeAliasDeclaration:
    'type' BindingIdentifier '=' ArrayType ';' 
```

Performs a simple binding of an array type. In ReasonML we will use the `Js.Array.t('t)` type.

Example of a TypeScript declaration:

````typescript
type MyType = string[];
````

Example of a ReasonML equivalent:

````reason
module MyType = {
    type t = Js.Array.t(string);
}
````

### Type alias declaration binding a tuple type

```
TypeAliasDeclaration:
    'type' BindingIdentifier '=' TupleType ';' 
```

Performs a simple binding of a tuple type.

Example of a TypeScript declaration:

````typescript
type MyType = [string, number, boolean];
````

Example of a ReasonML equivalent:

````reason
module MyType = {
    type t = (string, int, bool);
}
````

### Ambient variable declaration

```
AmbientVariableDeclaration:
    'declare' 'var' AmbientBindingList ';'
    'declare' 'let' AmbientBindingList ';'
    'declare' 'const' AmbientBindingList ';'
```

When representing an ambient variable declaration, we will use the `@bs.val` attribute for read the variable value. If the variable is not a constant the code needs to allow one to update the variable value. To do that we will generate an update function (set):

Example of a TypeScript declaration:

````typescript
declare let value1: number;
declare const value2: number;
````

Example of a ReasonML equivalent:

````reason
[@bs.val] external value1: float = "value1";
let setValue1 = (_value: float): float => [%bs.raw {| value1 = _value |}];

[@bs.val] external value2: float = "value2";
````

> NOTE: This declaration is an experimental approach.

### Ambient function declaration

The `[@bs.send]` attribute will be used to declare the reasonml function.

```
AmbientFunctionDeclaration:
    'declare' 'function' BindingIdentifier CallSignature ';'

CallSignature:
    TypeParameter? '(' ParameterList? ')' TypeAnnotation?
```

Example of a TypeScript declaration:

````typescript
declare function greet(greeting: string): void;
````

Example of a ReasonML equivalent:

````reason
[@bs.send] external greet: (string) => unit = "greet";
````

### Enum declaration

In TypeScript enums are used to create named constants.

```
EnumDeclaration:
    'const'? 'enum' BindingIdentifier '{' EnumMemberList '}'
```

In TypeScript we can assign an expression value to each of the enum keys. Example:

```typescript
enum Response {
    No = 0,
    Yes = 1,
    Cancel = "Cancel"
}
```

#### Converting a numeric zero-based enum (WIP)

When we declare an enum type without assign a value to its keys the first key starts with the value zero.

Example of a TypeScript declaration:

````typescript
declare enum EnumTyp { 
    Val1, 
    Val2, 
    Val3, 
};
````

In the above expression `EnumTyp.Val1` has value `0`, `EnumTyp.Val2` has value `1` an `EnumTyp.Val3` has value `2`.

Example of a ReasonML equivalent:

````reason
module EnumTyp = {
  [@bs.deriving jsConverter]
  type t =
    | [@bs.as 0] Val1
    | [@bs.as 1] Val2
    | [@bs.as 2] Val3;
}
````

In TypeScript, if we want to get the enum property name as a string we can use:

````typescript
declare enum EnumTyp { 
    Val1, 
    Val2, 
    Val3, 
};

console.log(EnumTyp[EnumTyp.Val2])
// => "Val2"
````

To have something equivallent, a function caled `name(...)` will be created in the ReasonML binding to allows the code to extract the key name:

````reason
module EnumTyp = {
  [@bs.deriving jsConverter]
  type t =
    | [@bs.as 0] Val1
    | [@bs.as 1] Val2
    | [@bs.as 2] Val3;

  let name = (v: t) =>
    switch (v) {
    | Val1 => "Val1"
    | Val2 => "Val2"
    | Val3 => "Val3"
    };
}

EnumTyp.Val2 |> EnumTyp.name |> Js.log;
/* "Val2" */
````

> NOTE: work in progress, it still needs to implement the other kinds of enum declaration. See https://www.typescriptlang.org/docs/handbook/enums.html and the grammar in the top of this file.

---

> See the [api tests](./__tests__/MainTest.re) for more details.

