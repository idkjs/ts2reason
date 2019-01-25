// Generated by BUCKLESCRIPT VERSION 4.0.18, PLEASE EDIT WITH CARE
'use strict';

var Os = require("os");
var Jest = require("@glennsl/bs-jest/src/jest.js");
var Writer$Ts2reason00 = require("../src/Writer.bs.js");

function makeFakeTsNode(ns, id, kind) {
  return /* record */[
          /* ns */ns,
          /* id */id,
          /* kind */kind,
          /* node */undefined
        ];
}

function makeFakeTsType(_typ) {
  return ( { getText: () => _typ } );
}

function makeFakeTsParDec(_name, _typ) {
  return (
    {
      getName: () => _name,
      getType: () => ({ getText: () => _typ })
    }
  );
}

describe("Writer", (function () {
        Jest.test("write", (function (param) {
                var wState = Writer$Ts2reason00.make(Os.EOL, "", 0);
                return Jest.Expect[/* toEqual */12]("some text !!", Jest.Expect[/* expect */0](Writer$Ts2reason00.getCode(Writer$Ts2reason00.write(Writer$Ts2reason00.write(wState, "some text"), " !!"))));
              }));
        Jest.test("writeComment", (function (param) {
                var wState = Writer$Ts2reason00.make(Os.EOL, "", 0);
                return Jest.Expect[/* toEqual */12]("/* some comment */", Jest.Expect[/* expect */0](Writer$Ts2reason00.getCode(Writer$Ts2reason00.writeComment(wState, "some comment"))));
              }));
        Jest.test("writeNewLine", (function (param) {
                var wState = Writer$Ts2reason00.make(Os.EOL, "", 0);
                return Jest.Expect[/* toEqual */12](Os.EOL, Jest.Expect[/* expect */0](Writer$Ts2reason00.getCode(Writer$Ts2reason00.writeNewLine(wState))));
              }));
        Jest.test("writeRawJs", (function (param) {
                var wState = Writer$Ts2reason00.make(Os.EOL, "", 0);
                return Jest.Expect[/* toEqual */12]("[%bs.raw {| a b c d e |}]", Jest.Expect[/* expect */0](Writer$Ts2reason00.getCode(Writer$Ts2reason00.writeRawJs(wState, "a b c d e"))));
              }));
        Jest.test("writeReasonType", (function (param) {
                var wState = Writer$Ts2reason00.make(Os.EOL, "", 0);
                return Jest.Expect[/* toEqual */12]("t_aaa_bbb_ccc", Jest.Expect[/* expect */0](Writer$Ts2reason00.getCode(Writer$Ts2reason00.writeReasonType(wState, makeFakeTsNode(/* array */[
                                            "aaa",
                                            "bbb"
                                          ], "ccc", /* ModuleDeclaration */244)))));
              }));
        Jest.testAll("writeType", /* :: */[
              /* tuple */[
                makeFakeTsType("string"),
                /* array */[],
                "string"
              ],
              /* :: */[
                /* tuple */[
                  makeFakeTsType("boolean"),
                  /* array */[],
                  "bool"
                ],
                /* :: */[
                  /* tuple */[
                    makeFakeTsType("number"),
                    /* array */[],
                    "float"
                  ],
                  /* :: */[
                    /* tuple */[
                      makeFakeTsType("xyz"),
                      /* array */[],
                      "t_TODO"
                    ],
                    /* :: */[
                      /* tuple */[
                        makeFakeTsType("MyObj"),
                        /* array */[makeFakeTsNode(/* array */[], "MyObj", /* ModuleDeclaration */244)],
                        "t_MyObj"
                      ],
                      /* [] */0
                    ]
                  ]
                ]
              ]
            ], (function (param) {
                return Jest.Expect[/* toEqual */12](param[2], Jest.Expect[/* expect */0](Writer$Ts2reason00.getCode(Writer$Ts2reason00.writeType(Writer$Ts2reason00.make(Os.EOL, "", 0), param[0], param[1]))));
              }));
        Jest.test("writeIf", (function (param) {
                var wState = Writer$Ts2reason00.make(Os.EOL, "", 0);
                return Jest.Expect[/* toEqual */12]("true expr", Jest.Expect[/* expect */0](Writer$Ts2reason00.getCode(Writer$Ts2reason00.writeIf(wState, true, "true expr", "false expr"))));
              }));
        Jest.testAll("writeParameterName", /* :: */[
              /* tuple */[
                "type",
                true,
                "_type"
              ],
              /* :: */[
                /* tuple */[
                  "type",
                  false,
                  "type_"
                ],
                /* :: */[
                  /* tuple */[
                    "name",
                    false,
                    "name"
                  ],
                  /* [] */0
                ]
              ]
            ], (function (param) {
                return Jest.Expect[/* toEqual */12](param[2], Jest.Expect[/* expect */0](Writer$Ts2reason00.getCode(Writer$Ts2reason00.writeParameterName(Writer$Ts2reason00.make(Os.EOL, "", 0), param[0], param[1]))));
              }));
        Jest.test("writeParameter", (function (param) {
                var wState = Writer$Ts2reason00.make(Os.EOL, "", 0);
                return Jest.Expect[/* toEqual */12]("_param: float", Jest.Expect[/* expect */0](Writer$Ts2reason00.getCode(Writer$Ts2reason00.writeParameter(wState, makeFakeTsParDec("param", "number"), /* array */[]))));
              }));
        Jest.testAll("writeArgumentsToMethodDecl", /* :: */[
              /* tuple */[
                /* array */[],
                "(_inst: t)"
              ],
              /* :: */[
                /* tuple */[
                  /* array */[
                    makeFakeTsParDec("param01", "number"),
                    makeFakeTsParDec("param02", "boolean"),
                    makeFakeTsParDec("param03", "string")
                  ],
                  "(_inst: t, _param01: float, _param02: bool, _param03: string)"
                ],
                /* [] */0
              ]
            ], (function (param) {
                return Jest.Expect[/* toEqual */12](param[1], Jest.Expect[/* expect */0](Writer$Ts2reason00.getCode(Writer$Ts2reason00.writeArgumentsToMethodDecl(Writer$Ts2reason00.make(Os.EOL, "", 0), param[0], /* array */[]))));
              }));
        return Jest.testAll("writeArgumentsToFunctionDecl", /* :: */[
                    /* tuple */[
                      /* array */[],
                      "()"
                    ],
                    /* :: */[
                      /* tuple */[
                        /* array */[
                          makeFakeTsParDec("param01", "number"),
                          makeFakeTsParDec("param02", "boolean"),
                          makeFakeTsParDec("param03", "string")
                        ],
                        "(_param01: float, _param02: bool, _param03: string)"
                      ],
                      /* [] */0
                    ]
                  ], (function (param) {
                      return Jest.Expect[/* toEqual */12](param[1], Jest.Expect[/* expect */0](Writer$Ts2reason00.getCode(Writer$Ts2reason00.writeArgumentsToFunctionDecl(Writer$Ts2reason00.make(Os.EOL, "", 0), param[0], /* array */[]))));
                    }));
      }));

exports.makeFakeTsNode = makeFakeTsNode;
exports.makeFakeTsType = makeFakeTsType;
exports.makeFakeTsParDec = makeFakeTsParDec;
/*  Not a pure module */
