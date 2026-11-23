# TypeScript Configuration (tsconfig.json)

## 1. What is tsconfig.json?

ملف `tsconfig.json` هو ملف الإعدادات الرئيسي لمشروع TypeScript.

يخبر هذا الملف TypeScript Compiler (`tsc`) كيف يتعامل مع ملفات المشروع، وكيف يفحص الأنواع (Type Checking)، وما هي إعدادات تحويل TypeScript إلى JavaScript (Compilation).

عند تنفيذ الأمر:

```
npx tsc
```

يبحث TypeScript عن ملف `tsconfig.json` ويستخدم الإعدادات الموجودة فيه.

---

## 2. Important Compiler Options

### 2.1. strict

```
"strict": true
```

**What is it?**

يفعّل مجموعة من خيارات الفحص الصارمة (Strict Type Checking Options)، بهدف اكتشاف أخطاء الأنواع المحتملة أثناء التطوير، قبل تشغيل البرنامج.

من أهم الخيارات التي يشملها:

|Option|Description|
|---|---|
|`noImplicitAny`|يمنع TypeScript من افتراض النوع `any` عندما لا يتم تحديد النوع ولا يستطيع استنتاجه.|
|`strictNullChecks`|يجعل TypeScript يتعامل مع `null` و`undefined` كأنواع يجب فحصها والتعامل معها صراحةً.|
|`strictFunctionTypes`|يطبّق قواعد أكثر صرامة عند فحص أنواع الدوال.|
|`strictPropertyInitialization`|يتحقق من تهيئة خصائص الـ Classes المطلوبة.|

**Example:**
بدون تحديد نوع للـ parameter:

```js
function getUserName(user) {
  return user.name;
}
```

عند تفعيل `strict: true` سيظهر خطأ لأن TypeScript لا يستطيع استنتاج نوع `user`، وسيعتبره ضمنيًا `any`.

الحل:
```js
type User = {
  id: number;
  name: string;
};

function getUserName(user: User): string {
  return user.name;
}
```

مثال آخر على `strictNullChecks`:
```js
const users = [
  { id: 1, name: "Mohammad" },
  { id: 2, name: "Ahmad" },
];

const user = users.find((user) => user.id === 5);

console.log(user.name);
```

قد لا يجد `find()` أي مستخدم، وبالتالي يمكن أن تكون النتيجة `undefined`.
سيطلب TypeScript معالجة هذه الحالة:

```js
if (user) {
  console.log(user.name);
}
```

**Why do we use it?**

- اكتشاف الأخطاء المتعلقة بالأنواع مبكرًا.
- تقليل استخدام `any` غير المقصود.
- التعامل بشكل صحيح مع `null` و`undefined`.
- كتابة كود أكثر أمانًا وقابلية للصيانة.

> ملاحظة: `strict: true` يفعّل مجموعة من الفحوصات الصارمة، لكنه لا يفعّل جميع خيارات TypeScript الممكنة.

---

### 2.2. target

```
"target": "esnext"
```

**What is it?**

يحدد إصدار JavaScript الذي سيستهدفه TypeScript عند تحويل ملفات TypeScript إلى JavaScript.

بمعنى آخر، يحدد مستوى ميزات JavaScript التي يمكن أن يحتفظ بها الكود الناتج، أو التي قد يحتاج TypeScript إلى تحويلها إلى صياغة أقدم.

**Example:**
لنفترض أن لدينا الكود التالي:

```js
const greet = (name: string): string => {
  return `Hello ${name}`;
};
```

عند استخدام:
```js
"target": "ES5"
```

قد يحوّل TypeScript الـ Arrow Function إلى Function تقليدية:

```js
var greet = function (name) {
  return "Hello " + name;
};
```

أما عند استخدام:

```js
"target": "ES2020"
```

فيمكنه الاحتفاظ بالـ Arrow Function:

```js
const greet = (name) => {
  return `Hello ${name}`;
};
```

**Common target values:**

|Target|Description|
|---|---|
|`ES5`|إصدار قديم من JavaScript.|
|`ES2015` / `ES6`|إصدار أضاف ميزات مثل `let`, `const` وArrow Functions.|
|`ES2020`|يدعم مجموعة أحدث من ميزات JavaScript.|
|`ESNext`|يستهدف أحدث ميزات JavaScript التي يدعمها إصدار TypeScript المستخدم.|

**What does ESNext mean in my configuration?**

استخدام `ESNext` يعني أن TypeScript يستهدف أحدث صياغة JavaScript يعرفها إصدار المترجم المستخدم.

يجب اختيار `target` بما يتناسب مع إصدار Node.js أو بيئة التشغيل التي سيعمل عليها التطبيق.

**Why do we use it?**

لضمان أن JavaScript الناتج يتناسب مع بيئة التشغيل المستهدفة، والاستفادة من ميزات JavaScript الحديثة عند توفر دعمها.

> ملاحظة: `target` لا يضمن دعم جميع واجهات JavaScript (Runtime APIs)، ولا يقوم تلقائيًا بإضافة Polyfills.

---

### 2.3. rootDir

```
"rootDir": "./src"
```

**What is it?**

يحدد المجلد الأساسي (Root Directory) الذي يحتوي على ملفات TypeScript المصدرية.
يستخدم TypeScript هذا المجلد لتحديد البنية النسبية للملفات عند إخراج ملفات JavaScript.

**Example:**
لنفترض أن بنية المشروع كالتالي:

```js
my-project/
│
├── src/
│   ├── index.ts
│   ├── users.ts
│   └── products.ts
│
├── tsconfig.json
└── package.json
```

في هذه الحالة:

```js
"rootDir": "./src"
```

يعني أن مجلد `src` هو جذر ملفات المصدر.

**Important:**
الـ`rootDir` لا يحدد الملفات التي يجب على TypeScript فحصها أو تضمينها في عملية Compilation.
وظيفته الأساسية تحديد جذر بنية الملفات الناتجة، كما يشترط أن تكون ملفات TypeScript التي سيتم تحويلها ضمن هذا المجلد.
إذا كان لدينا ملف TypeScript مطلوب تحويله خارج `src`، فقد يظهر خطأ لأن الملف خارج `rootDir`.

**Why do we use it?**

- تنظيم ملفات المشروع.
- فصل ملفات المصدر عن الملفات الناتجة.
- الحفاظ على بنية مجلدات واضحة عند عملية Compilation.

---

### 2.4. outDir

```js
"outDir": "./dist"
```

**What is it?**

يحدد المجلد الذي سيضع TypeScript بداخله ملفات JavaScript الناتجة عن عملية Compilation.

**Example:**

قبل تنفيذ عملية Compilation:

```
my-project/
│
├── src/
│   ├── index.ts
│   ├── users.ts
│   └── products.ts
│
├── tsconfig.json
└── package.json
```

بعد تنفيذ:

```
npx tsc
```

ستصبح بنية المشروع تقريبًا:

```
my-project/
│
├── src/
│   ├── index.ts
│   ├── users.ts
│   └── products.ts
│
├── dist/
│   ├── index.js
│   ├── users.js
│   └── products.js
│
├── ts
```