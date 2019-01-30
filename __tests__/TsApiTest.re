open Jest;
open TsApi;
open Ts;

[@bs.val] [@bs.module "os"] external eol: string = "EOL";

describe("Inspect a `type alias` declaration", () => {
  let node = extractTypesFromCode("type Typ = string")[0];

  Expect.(
    test("extractTypesFromCode typeAlias name", () =>
      expect(node->TsNode.getName) |> toEqual("Typ")
    )
  );

  Expect.(
    test("extractTypesFromCode typeAlias kind", () =>
      expect(node->TsNode.getKind)
      |> toEqual(SyntaxKind.TypeAliasDeclaration)
    )
  );

  Expect.(
    test("extractTypesFromCode typeAlias node->type", () =>
      expect(node->TsNode.getType->TsType.getName) |> toEqual("string")
    )
  );

  Expect.(
    test("extractTypesFromCode typeAlias isArray", () =>
      expect(node->TsNode.getType->TsType.getTypeKind)
      |> toEqual(TypeKind.Regular)
    )
  );

  Expect.(
    test("extractTypesFromCode typeAlias typeName", () =>
      expect(node->TsNode.getType->TsType.getName) |> toEqual("string")
    )
  );

  let node = extractTypesFromCode("type Typ = boolean[]")[0];

  Expect.(
    test("extractTypesFromCode typeAlias isArray", () =>
      expect(node->TsNode.getType->TsType.getTypeKind)
      |> toEqual(TypeKind.Array)
    )
  );

  Expect.(
    test("extractTypesFromCode typeAlias arrayElementType->typeName", () =>
      expect(node->TsNode.getType->TsType.getArrayType->TsType.getName)
      |> toEqual("boolean")
    )
  );

  let node = extractTypesFromCode("declare var a: number;")[0];

  Expect.(
    test("extractTypesFromCode varDeclaration name", () =>
      expect(node->TsNode.getName) |> toEqual("a")
    )
  );

  Expect.(
    test("extractTypesFromCode varDeclaration kind", () =>
      expect(node->TsNode.getKind) |> toEqual(SyntaxKind.VariableDeclaration)
    )
  );

  Expect.(
    test("extractTypesFromCode varDeclaration node->type", () =>
      expect(node->TsNode.getType->TsType.getName) |> toEqual("number")
    )
  );

  let node = extractTypesFromCode(
               "declare function greet(greeting: string): void;",
             )[0];

  Expect.(
    test("extractTypesFromCode functionDeclaration name", () =>
      expect(node->TsNode.getName) |> toEqual("greet")
    )
  );

  Expect.(
    test("extractTypesFromCode functionDeclaration kind", () =>
      expect(node->TsNode.getKind) |> toEqual(SyntaxKind.FunctionDeclaration)
    )
  );

  Expect.(
    test("extractTypesFromCode functionDeclaration node->type", () =>
      expect(node->TsNode.getType->TsType.getName) |> toEqual("void")
    )
  );

  Expect.(
    test("extractTypesFromCode functionDeclaration parameter count", () =>
      expect(node->TsNode.getParameters |> Array.length) |> toEqual(1)
    )
  );

  Expect.(
    test("extractTypesFromCode functionDeclaration parameter name", () =>
      expect(node->TsNode.getParameters[0]->TsParameter.getName)
      |> toEqual("greeting")
    )
  );

  Expect.(
    test("extractTypesFromCode functionDeclaration parameter type", () =>
      expect(
        node->TsNode.getParameters[0]->TsParameter.getType->TsType.getName,
      )
      |> toEqual("string")
    )
  );

  let node = extractTypesFromCode(
               "declare enum EnumTyp { Val1, Val2, Val3, };",
             )[0];

  Expect.(
    test("extractTypesFromCode enumDeclaration name", () =>
      expect(node->TsNode.getName) |> toEqual("EnumTyp")
    )
  );

  Expect.(
    test("extractTypesFromCode enumDeclaration kind", () =>
      expect(node->TsNode.getKind) |> toEqual(SyntaxKind.EnumDeclaration)
    )
  );

  Expect.(
    test("extractTypesFromCode enumDeclaration member count", () =>
      expect(node->TsNode.getEnumMembers |> Array.length) |> toEqual(3)
    )
  );

  Expect.(
    test("extractTypesFromCode enumDeclaration member->[0]->name", () =>
      expect(node->TsNode.getEnumMembers[0]->TsEnumMember.getName)
      |> toEqual("Val1")
    )
  );

  let node = extractTypesFromCode("declare type Test = {name: string};")[0];

  Expect.(
    test("extractTypesFromCode typeLiteral name", () =>
      expect(node->TsNode.getName) |> toEqual("Test")
    )
  );

  Expect.(
    test("extractTypesFromCode typeLiteral members[0]->name", () =>
      expect(node->TsNode.getType->TsType.getMembers[0]->TsNode.getName)
      |> toEqual("name")
    )
  );

  Expect.(
    test("extractTypesFromCode typeLiteral members[0]->type->name", () =>
      expect(
        node->TsNode.getType->TsType.getMembers[0]
        ->TsNode.getType
        ->TsType.getName,
      )
      |> toEqual("string")
    )
  );
});