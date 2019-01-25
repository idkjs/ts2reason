// Generated by BUCKLESCRIPT VERSION 4.0.18, PLEASE EDIT WITH CARE
'use strict';

var Os = require("os");
var Jest = require("@glennsl/bs-jest/src/jest.js");
var Writer$Ts2reason00 = require("../src/Writer.bs.js");

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
                return Jest.Expect[/* toEqual */12]("t_aaa_bbb_ccc", Jest.Expect[/* expect */0](Writer$Ts2reason00.getCode(Writer$Ts2reason00.writeReasonType(wState, /* record */[
                                        /* ns : array */[
                                          "aaa",
                                          "bbb"
                                        ],
                                        /* id */"ccc",
                                        /* kind : ModuleDeclaration */244,
                                        /* node */undefined
                                      ]))));
              }));
        return Jest.testAll("writeType", /* :: */[
                    /* tuple */[
                      ( { getText: () => "string" } ),
                      /* array */[],
                      "string"
                    ],
                    /* :: */[
                      /* tuple */[
                        ( { getText: () => "boolean" } ),
                        /* array */[],
                        "bool"
                      ],
                      /* :: */[
                        /* tuple */[
                          ( { getText: () => "number" } ),
                          /* array */[],
                          "float"
                        ],
                        /* :: */[
                          /* tuple */[
                            ( { getText: () => "xyz" } ),
                            /* array */[],
                            "t_TODO"
                          ],
                          /* :: */[
                            /* tuple */[
                              ( { getText: () => "MyObj" } ),
                              /* array */[/* record */[
                                  /* ns : array */[],
                                  /* id */"MyObj",
                                  /* kind : ModuleDeclaration */244,
                                  /* node */undefined
                                ]],
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
      }));

/*  Not a pure module */