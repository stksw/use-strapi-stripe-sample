// export const test = (name: string): number => {
//   let x = name;
//   return Number(x);
// };

// type Bird = {
//   name: 'bird';
//   value: number;
// };

// type Tree = {
//   name: 'tree';
//   value: string;
// };

// type BirdTree = Bird | Tree;
// type BirdTreeKey = BirdTree['name'];

// // type FuncBirdTree<T extends BirdTreeKey> = (name: T) => T extends 'bird' ? number : string
// type FuncBirdTree<T> = <U extends BirdTreeKey>(
//   name: U
// ) => T extends { name: BirdTreeKey; value: infer V } ? V : never;

// export const func: FuncBirdTree<BirdTree> = <U extends BirdTreeKey>(
//   name: U
// ) => {
//   if (name === 'bird') return 1;
//   return 'sakura';
// };

// //

// type Test1 = {
//   name: 'taro';
//   value: number;
// };

// type Test2 = {
//   name: 'shiro';
//   value: string;
// };

// type TestX = Test1 | Test2;
// type TestKey = TestX['name'];
// type TestFn<X> = <T extends TestKey>(
//   name: T
// ) => X extends { name: TestKey; value: infer U } ? U : never;

// const testFn: TestFn<TestX> = <T extends TestKey>(name: TestKey) => {
//   return name == 'taro' ? 1 : 'aaa';
// };

// const res = testFn('shiro');

// // ユーティリティ型

// type Person = {
//   name: string;
//   age: number;
//   power: number;
// };

// type NameAndAge = Pick<Person, 'name' | 'age'>;

// type NameAndAgeType = MyPick<Person, 'name' | 'age'>;

// type MyPick<T, K extends keyof T> = {
//   [key in K]: T[key];
// };

// type RecordKeys = 'taro' | 'jiro' | 'saburo';
// type RecordValue = {
//   name: string;
//   age: number;
// };

// type RecordType = MyRecord<RecordKeys, RecordValue>;
// // type RecordType = {
// //   taro: RecordValue;
// //   jiro: RecordValue
// //   saburo: RecordValue
// // }

// type MyRecord<K extends string, V> = {
//   [key in K]: V;
// };

// type TestRequest<T> = (type: T) => T extends string ? string : number

// //const test: TestRequest = (type, data) => {}

// const QUERY_KEYS = ["users", "posts", "comments"] as const;
// export type Unpacked<T> = T extends { [K in keyof T]: infer U } ? U : never;
// export type QueryKeysTypes = Unpacked<typeof QUERY_KEYS>
