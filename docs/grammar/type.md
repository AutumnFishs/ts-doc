# Ts的类型语法

ts的基础类型和js基础类型基本一致，包括 number、string、boolean、null、undefined、symbol、bigint、object，除此之外，ts还扩展了void、any、never、unknown、enum、tuple、union、type、interface、class等类型。

## 基本类型语法

1. 变量声明时，类型写在变量名后面，用冒号分隔，如：`let 变量名: 类型 = 值;`，以下是和js基本类型对应的ts类型：
    ```ts
    // number
    let num: number = 1;
    // string
    let str: string = 'hello';
    // boolean
    let bool: boolean = true;
    // symbol
    let s:symbol = Symbol('s');
    // bigint 
    let b: bigint = 1n;
    // null
    let n: null = null;
    // undefined
    let u: undefined = undefined;

    // 数组
    let arr: number[] = [1, 2, 3];
    // 数组泛型写法 
    let arr2: Array<number> = [1, 2, 3];

    // 对象类型
    let obj: object = {name: 'obj'};

    // 函数类型
    let fn:Function = (){};
    ```

2. 和 `null`、`undefined`相似还有`void`类型，表示没有返回值，如：`function fn(): void {}`
    ```ts
    // void 函数没有返回值，可以返回 undefined 或 null 或者不返回
    function fn(): void {
        console.log('fn');
        // return 
        // return undefined
        // return null
    }
    ```

3. `any`类型，表示任意类型，可以赋值给任意类型，一般不推荐使用，容易把`typescript`变成`anyscript`；与之相对的还有`unknown`类型，表示未知类型，只能赋值给`unknown`或`any`类型，不能赋值给其他类型。比如：
    ```ts
    let unknown:unknown = 'hello';
    let str:string = unknown; // 提示 不能将类型“unknown”分配给类型“string”。
    ```  
    除非断言，比如:
    ```ts
    let unknown:unknown = 'hello';
    let str:string = unknown as string; 
    ```

4. `never`类型，表示永远不会发生值的类型，一般用于函数返回类型，表示函数永远不会返回值，包括`any`也不可以赋值给`never`，如：`function fn(): never {}`
    ```ts
    // never 函数永远不会返回值
    function fn(): never {
        
    }
    ```
    和 `void`类型不同的是，`void`类型表示函数没有返回值，可以为`null`、`undefined`或者没有返回值，而`never`类型表示函数永远不会返回值，比如函数抛出异常，或者函数是一个死循环。

5. `Tuple`元组类型，表示一个固定长度的数组，每个元素都有确定的类型，比如：
   ``` ts
   let tuple: [number, string] = [1, 'hello'];
   let tuple2: [number, string] = ['hello' ,1];// 提示 不能将类型“string”分配给类型“number”；不能将类型“number”分配给类型“string”
   ```

6. `enum`枚举类型，表示一个枚举值，比如：
   ```ts
   enum Color {Red, Green, Blue};

   //等价于
   enum Color {Red = 0, Green = 1, Blue = 2};
   ```
   默认情况下，枚举的值从0开始递增，但也可以手动指定枚举的值，如：`enum Color {Red = 1, Green, Blue};`，枚举的值可以是数字、字符串、布尔值等

## 进阶类型语法

1. **接口**：`interface`接口类型，可以表示一个对象、函数、类等，比如：
    - **对象类型**
    ```ts
    interface Person {
       name: string;// 必填
       age?: number;// 可选
       [key: string]: any;// 可选，任意属性
       readonly id: number;// 只读
    }

    let person: Person = {
       name: 'person',
       age: 18，
       id: 1
       xxx: 'xxx'
    }
    ```
    上面的`Person`接口表示一个对象，该对象有`name`属性，类型为`string`，`age`属性，类型为`number`，`?`则表示这个属性是一个可选属性，`[key: string]: any`表示该对象可以有任意数量的属性，键名是字符串类型，键值则是`any`类型，`readonly id: number`表示该对象的`id`属性只读，不能被修改，并且值只能是`number`。

    - **类类型**
        - 静态部分：静态属性、方法只有类本身可以访问，实例不能访问，如：`static sex = '男'`
        ``` ts
        interface Person {
            name: string;
        }

        class Man implements Person {
            name: string; // 不写name会提示 类“Man”错误实现接口“Person”。类型 "Man" 中缺少属性 "name"，但类型 "Person" 中需要该属性
            age?: number;
            static sex = '男'// 静态属性
            constructor(name: string, age?: number) {
                this.name = name;
                this.age = age;
            }
            static getSex() { // 静态方法
                return this.sex;
            }
        }
        console.log(Man.getSex(), Man.sex); // 男 男
        ```
        - 实例部分：实例属性、方法通过实例可以访问
        ``` ts
        class Man implements Person {
            name: string;
            age?: number;
            constructor(name: string, age?: number) {
                this.name = name;
                this.age = age;
            }
        }

        const man = new Man("John", 30);
        console.log(man.name, man.age); // John 30
        ```
        - 继承
        class `Son` 继承了 `Man` 类，并添加了 `sonName` 属性：
        ``` ts
        class Son extends Man {
            sonName: string;
            constructor(name: string, age?: number, sonName: string) {
                super(name, age);// 子类的构造函数必须调用父类的构造函数
                this.sonName = sonName;
            }
        }
        console.log(Son.getSex(), Son.sex); // 男 男
        ```

2. **类型别名**：`type`类型别名，可以给一个类型起一个别名，比如：
    ```ts
    type Person = {
        name: string;
        age: number;
    }

    type numOrStr = number | string;

    let person: Person = {
        name: 'person',
        age: 18
    }
    ```
    上面的`Person`类型别名表示一个对象，该对象有`name`属性，类型为`string`，`age`属性，类型为`number`。`numOrStr`则是一个**联合类型**，表示`number`或`string`类型。
    
    `type`和`interface`的区别：
    - `type`可以表示基本类型、联合类型、交叉类型、元组类型、枚举类型、函数类型、类类型等，而`interface`只能表示对象类型。
    - `interface`可以扩展新的类型，而`type`不能扩展新的类型。比如：
        - `interface`扩展新的类型：
        ```ts
        interface Person {
            name: string;
            age: number;
        }
        let person: Person = {
            name: 'person',
            age: 18
        }// 提示 类型 "{ name: string; age: number; }" 中缺少属性 "sex"，但类型 "Person" 中需要该属性。
        interface Person {
            sex: string;
        }
        // Person添加新的属性类型具有类型提升，即新的类型会覆盖原来的类型

        type Person = {
            name: string;
            age: number;
        }

        type Person = {
            sex: string;
        }// 提示 标识符“Person”重复。
        // 上面的代码中，`Person`类型有两个类型，一个是`name`和`age`，另一个是`sex`，这是非法的，因为`type`不能添加新的类型。
        ```
    - `interface`接口还可以通过`extends`关键字扩展新的类型，而`type`可以通过交叉类型`&`扩展新的类型。比如：
        - `interface`接口扩展新的类型：
            ```ts
            interface Person {
                name: string;
                age: number;
            }

            interface Student extends Person {
                school: string;
            }

            let student: Student = {
                name: 'student',
                age: 18,
                school: 'school'
            }
            ```
        - `type`通过**交叉类型**扩展新的类型：
            ```ts
            type Person = {
                name: string;
                age: number;
            }

            type Student = Person & {
                school: string;
            }

            let student: Student = {
                name: 'student',
                age: 18,
                school: 'school'
            }
            ```
    

3. **泛型**：定义一个函数、接口或类，不预先指定具体的类型，而是在使用的时候再指定类型。比如：
   ``` ts
   function fn<T>(arg: T): T {
       return arg;
   }
   let result = fn<string>("hello"); // hello
   ```
4. **类型推论**：相当于隐式的类型推断，TypeScript 会根据赋值语句的右值来推断出左值的类型。比如：
    ``` ts
    let zoo = [new Rhino(), new Elephant(), new Snake()]; // zoo的类型自动推断为(Rhino | Elephant | Snake)[]
    let animal = zoo[0]; // animal的类型自动推断为Rhino | Elephant | Snake
    ```
5. **交叉类型&联合类型**：交叉类型表示多个类型的交集，联合类型表示多个类型的并集。比如上述：
    - 交叉类型：
    ``` ts
    type Person = {
        name: string;
        age: number;
    }

    type Student = Person & {
        school: string;
    }

    let student: Student = {
        name: 'student',
        age: 18,
        school: 'school'
    }
    ```
    - 联合类型：
    ``` ts
    type numOrStr = number | string;
    let numOrStr: numOrStr = 123; // numOrStr的类型为number
    numOrStr = 'hello'; // numOrStr的类型为string
    ```
6. **类型保护**：在运行时确定一个变量属于某个类型，比如：
    ```ts
    // typeof 类型保护 针对一个基本数据类型
    function isNumber(x: any): x is number {
        return typeof x === "number";
    }

    // instanceof 类型保护 针对类、对象等
    class Animal {
        name: string;
    }

    class Fish extends Animal {
        swim() { }
    }

    class Bird extends Animal {
        fly() { }
    }

    function isFish(animal: Animal): boolean {
        return animal instanceof Fish;
    }

    // 自定义类型保护
    function isFishCustom(animal: Animal): animal is Fish {
        return (animal as Fish).swim !== undefined;
    }
    ```
7. **类型断言**：告诉ts这个值是什么类型，比如：
    ``` ts
    let val = 'hello';
    let a  = val as string;//告诉ts，val是string类型
    let b = <string>val;

    val! // 告诉ts，val一定有值，不为null或undefined
    // 默认情况下，类型检查器认为 `null`与 `undefined`就是不存在值，可以赋值给任何类型。
    // `--strictNullChecks`标记可以解决`null`和`undefined`错误：表示它们和其他类型一样也是一个值
   ```
8. **函数重载**：函数名相同，参数类型或个数不同，返回值类型可以相同也可以不同，它的主要用处是可以是函数类型更加具体。比如：
    ``` ts
    function createElement(tagName: "img"): HTMLImageElement;
    function createElement(tagName: "input"): HTMLInputElement;
    // 可以添加更多重载签名
    function createElement(tagName: string): Element {
        const elem = document.createElement(tagName);
        if (tagName === "img") {
            return elem as HTMLImageElement;
        } else if (tagName === "input") {
            return elem as HTMLInputElement;
        } else {
            return elem;
        }
    }

    // 使用示例
    const imgElement = createElement("img"); // 类型为 HTMLImageElement
    const inputElement = createElement("input"); // 类型为 HTMLInputElement
    const divElement = createElement("div"); // 类型为 Element
    ```
9. **索引类型**：通过索引类型访问对象属性，比如：
    - 索引签名：索引签名的类型必须是string或number，不能是其他类型。比如：
    ``` ts
    interface StringArray {
        [key: number]: any;
        [param: string]: any;
    }
    ```
    - 动态属性访问：通过索引类型访问对象属性，比如：
    ``` ts
    function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
        return names.map(n => o[n]);
    }
    // K extends keyof T 表示 K必须是 T 的属性名，T[K][] 表示返回值是一个数组，数组中的元素类型是 T的属性名组成的类型，比如：
    let a = pluck({name: 'Alice', age: 21}, ['name']); // ['Alice']
    // 类型推断：
    function pluck<{
    name: string;
    age: number;
    }, "name">(o: {
        name: string;
        age: number;
    }, names: "name"[]): string[]


    interface A<T> {
        [key: string]: T;
    }
    let keys:keyof A<string>; // string|number(有个疑问，为什么不是string)
    let keys2:keyof A<number>; // number
    let value: A<number>["foo"]; // number
    ```
10. **映射类型**：通过映射类型可以创建新的类型，比如：
    ``` ts
    interface Person {
        name: string;
        age: number;
    }
    // 1.通过映射类型将某个对象类型中的属性全部变为只读类型
    type MyReadonly<T> = {
        readonly [P in keyof T]: T[P];
    };
    // 2.通过映射类型将某个对象类型中的属性全部变为可选类型
    type MyPartial<T> = {
        [P in keyof T]?: T[P];
    };

    type person = MyReadonly<Person>;

    type partialPerson = Partial<Person>;
    ```
