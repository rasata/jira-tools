jsLib = require('../src/jsLib.gs');

test('jsLib - buildUrl() accepts multiple ways of passing parameters', () => {
  var result = jsLib.buildUrl('https://www.example.org', {});
  expect(result).toBe('https://www.example.org');

  result = jsLib.buildUrl('https://www.example.org', { a: 'b' });
  expect(result).toBe('https://www.example.org?a=b');

  result = jsLib.buildUrl('https://www.example.org', { a: '1', b: '2' });
  expect(result).toBe('https://www.example.org?a=1&b=2');

  result = jsLib.buildUrl('https://www.example.org', { a: 'a?b', b: 'b=2' });
  expect(result).toBe('https://www.example.org?a=a%3Fb&b=b%3D2');

  result = jsLib.buildUrl('https://www.example.org', ['1', '2']);
  expect(result).toBe('https://www.example.org?0=1&1=2');

  result = jsLib.buildUrl('https://www.example.org', []);
  expect(result).toBe('https://www.example.org');

  result = jsLib.buildUrl('https://www.example.org', true);
  expect(result).toBe('https://www.example.org');

  result = jsLib.buildUrl('https://www.example.org');
  expect(result).toBe('https://www.example.org');
});


test('jsLib - getDateFromIso()', () => {
  var result = jsLib.getDateFromIso('2019-12-30T22:59:59.000+01:00');
  var compareDate = new Date('2019-12-30T21:59:59+00:00');
  var timeSecOnly = function (date) {
    return Math.floor(date.getTime() / 1000);
  };

  expect(typeof result).toBe('object');
  expect(result.toISOString()).toEqual(compareDate.toISOString());

  expect(timeSecOnly(jsLib.getDateFromIso(undefined))).toEqual(timeSecOnly(new Date()));
  expect(timeSecOnly(jsLib.getDateFromIso([]))).toEqual(timeSecOnly(new Date()));
  expect(timeSecOnly(jsLib.getDateFromIso({}))).toEqual(timeSecOnly(new Date()));
  expect(timeSecOnly(jsLib.getDateFromIso(''))).toEqual(timeSecOnly(new Date()));
});

test('copyObject', () => {
  var src = {
    prop1: "value1",
    prop2: "value2"
  };
  var newObject = jsLib.copyObject(src);
  expect(Object.keys(newObject).length).toBe(2);
  expect(newObject.prop1).toBe("value1");
  expect(newObject.prop2).toBe("value2");

  src.prop1 = "New value";
  expect(newObject.prop1).toBe("value1");
});


test('reverse', () => {

  expect(jsLib.reverse("abc")).toBe("cba");
  expect(jsLib.reverse(123)).toBeNull();
});

test('camelize', () => {
  expect(jsLib.camelize("My Name")).toBe("myName");
  expect(jsLib.camelize("my name")).toBe("myName");
  expect(jsLib.camelize("My API handler")).toBe("myAPIHandler");
  expect(jsLib.camelize("My    name   is  ")).toBe("myNameIs");

});

test('splitCommaList_', () => {
  expect(jsLib.splitCommaList_("GNS-Metapod")).toEqual(["GNS-Metapod"]);
  expect(jsLib.splitCommaList_("GNS-Metapod,Test")).toEqual(["GNS-Metapod", "Test"]);
  expect(jsLib.splitCommaList_("GNS-Metapod, Test")).toEqual(["GNS-Metapod", "Test"]);
  expect(jsLib.splitCommaList_(",GNS-Metapod, Test")).toEqual(["GNS-Metapod", "Test"]);
  expect(jsLib.splitCommaList_(",GNS-Metapod,, Test")).toEqual(["GNS-Metapod", "Test"]);
});

test('convertArrayToObj_', () => {
  myarray = [
    { prop1: "value1", prop2: "value2", key: "key1" },
    { prop1: "value11", prop2: "value21", key: "key2" },
    { prop1: "value11", prop2: "value22", key: "key3" }
  ];
  var obj1 = jsLib.convertArrayToObj_(myarray, function(field) {return field.key});
  expect(Object.keys(obj1).length).toBe(3);
  expect(obj1.key1).toEqual(myarray[0]);
  expect(obj1.key2).toEqual(myarray[1]);
  expect(obj1.key3).toEqual(myarray[2]);
})
