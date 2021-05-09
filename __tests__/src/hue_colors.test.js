const { hexToRGB } = require("../../src/lib/color_helpers");

describe("hexToRGB", () => {
  test("Returns invalid color if the hex is invalid", () => {
    const invalid1 = hexToRGB("invalid");
    const invalid2 = hexToRGB("123123@");
    const invalid3 = hexToRGB("#ff");
    const invalid4 = hexToRGB("#fffffffffffffffff");
    const invalid5 = hexToRGB("heello");
    const invalid6 = hexToRGB("FFFFFF");
    const invalid7 = hexToRGB("FFF");

    expect(invalid1).toBe(undefined);
    expect(invalid2).toBe(undefined);
    expect(invalid3).toBe(undefined);
    expect(invalid4).toBe(undefined);
    expect(invalid5).toBe(undefined);
    expect(invalid6).toBe(undefined);
    expect(invalid7).toBe(undefined);
  });

  test("Returns a valid color if the hex is valid", () => {
    const valid = hexToRGB("#ffffff");
    const validShort = hexToRGB("#ffffff");
    const valid2 = hexToRGB("#ff0000");
    const valid3 = hexToRGB("#00ff00");
    const valid4 = hexToRGB("#0000ff");

    expect(valid).toBe("rgb(255,255,255)");
    expect(validShort).toBe("rgb(255,255,255)");
    expect(valid2).toBe("rgb(255,0,0)");
    expect(valid3).toBe("rgb(0,255,0)");
    expect(valid4).toBe("rgb(0,0,255)");
  });
});
