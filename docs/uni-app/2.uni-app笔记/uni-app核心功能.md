# uni-app 核心功能

## 1、自定义导航栏

### 安全区域

不同手机的安全区域不同，适配安全区域能防止页面重要内容被遮挡。

可通过 `uni.getSystemInfoSync()` 获取屏幕边界到安全区的距离。

### 核心代码参考

自定义导航配置

```js
// src/pages.json
{
  "path": "pages/index/index",
  "style": {
    "navigationStyle": "custom", // 隐藏默认导航
    "navigationBarTextStyle": "white",
    "navigationBarTitleText": "首页"
  }
}
```

组件安全区适配

```html
<!-- src/pages/index/componets/CustomNavbar.vue -->
<script>
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<template>
  <!-- 顶部占位 -->
  <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <!-- ...省略 -->
  </view>
</template>
```

### 导航栏固定在顶部

- 页面 page 高度设置 100%，并使用 flex 布局

- 导航栏下面使用 scroll-view 作为滚动容器，高度撑满 `flex: 1`

```html
<template>
  <!-- 自定义导航栏 -->
  <CustomNavbar></CustomNavbar>

  <!-- 滚动容器 -->
  <scroll-view class="scroll-view" scroll-y>
    
  </scroll-view>
</template>

<style lang="scss">
/** 设置页面底色 */
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
}
</style>
```



## 2、首页

### 触底加载

[scroll-view 官方文档](https://zh.uniapp.dcloud.io/component/scroll-view.html)

滚动容器 `scroll-view` 提供了触底事件 `scrolltolower`

```html
<scroll-view @scrolltolower="onScrolltolower"></scroll-view>
```

### 下拉刷新

```html
<scroll-view 
  scroll-y
  refresher-enabled 
  :refresher-triggered="isTriggered"      // 在下拉刷新时，加载数据前设为 true，加载数据后设为 false
  @refresherrefresh="onRefresherrefresh"  // 下拉刷新
/>
```

### 骨架屏

使用微信开发者工具，生成骨架屏，然后用生成的 html 和 css，新建 vue 组件。

自定义导航栏下面的内容，才需要骨架屏

### 轮播图 swiper

轮播图组件 `swiper`，[swiper 官方文档](https://zh.uniapp.dcloud.io/component/swiper.html)

图片预览 `uni.previewImage` 对应原生 api 为 `wx.previewImage`

```html
<script setup lang="ts">
// 轮播图变化时，绑定事件
const currentIndex = ref(0)
const onChange: UniHelper.SwiperOnChange = (e) => {
  currentIndex.value = e.detail!.current
}

// 点击图片时，预览图片
const onTabImage = (url: string) => {
  uni.previewImage({
    current: url,
    urls: goods.value!.mainPictures
  })
}
</script>

<swiper @change="onChange" circular>
  <swiper-item v-for="item in goods?.mainPictures" :key="item">
    <image @tap="onTabImage(item)" mode="aspectFill" :src="item" />
  </swiper-item>
</swiper>
```



## 3、详情模块

### 弹出层 uni-popup

[uni-popup 官方文档](https://zh.uniapp.dcloud.io/component/uniui/uni-popup.html)

## 4、会员中心

### 设置页面分包和预下载

**小程序分包**：将小程序的**代码分割成多个部分**，分别打包成多个小程序包，**减少**小程序的**加载时间**，提高用户体验。

**分包预下载**：在进入小程序某个页面时，由框架**自动预下载**可能需要的分包，**提升**进入后续分包页面的**启动速度**。

#### 新建分包页面

manifest.json

```js
// 分包加载规则
"subPackages": [
  {
    // 子包的根目录
    "root": "pagesMember",
    // 页面路径
    "pages": [
      {
        "path": "settings/settings",
        "style": {
          "navigationBarTitleText": "设置"
        }
      }
    ]
  }
]
```

#### 配置分包预下载

```js
// 分包预下载规则
"preloadRule": {
  "pages/my/my": { // 进入这个页面时
    "network": "all",
    "packages": ["pagesMember"] // 预下载 subPackages 里配置的子包 pagesMember
  }
}
```



### 上传头像

#### 选择图片 uni.chooseMedia

#### 上传文件 uni.uploadFile

先注册拦截器，处理请求地址和请求头

```js
uni.addInterceptor('uploadFile', httpInterceptor)
```



### 表单

#### input 双向绑定

通过 `v-model` 双向绑定

```html
<input v-model="name" />
```

#### 单选框 radio-group

**radio-group** 通过 `change` 事件，来获取选中的值

**radio** 通过属性 `value` 设置值，通过属性 `checked` 设置是否选中

```html
<radio-group @change="onGenderChange">
  <label class="radio">
    <radio value="男" color="#27ba9b" :checked="profile?.gender === '男'" />
    男
  </label>
  <label class="radio">
    <radio value="女" color="#27ba9b" :checked="profile?.gender === '女'" />
    女
  </label>
</radio-group>
```

#### 日期选择器 picker mode="date"

**picker** 通过 `change` 事件，获取选中的值

```html
<picker
  mode="date"
  start="1900-01-01"
  :end="new Date()"
  :value="profile?.birthday"
  @change="onBirthdayChange"
>
</picker>
```

#### 城市选择器 picker mode="region"

**picker** 通过 `change` 事件，获取选中的值

e.detail.value 为城市名称

e.detail.code 为城市编码



### 弹出框

[交互反馈，官方文档](https://zh.uniapp.dcloud.io/api/ui/prompt.html)

#### 模态弹窗 uni.showModal

让用户进行二次确认

#### 消息提示框 uni.showToast

成功提示、失败提示



## 5.1、地址管理

### 表单校验 uni-forms

[uni-forms 官方文档](https://zh.uniapp.dcloud.io/component/uniui/uni-forms.html)

**uni-forms** 通过 `model` 绑定表单数据，通过 `rules` 配置校验规则

**uni-form-item** 通过 `name` 匹配校验规则

```html
<uni-forms ref="formRef" :rules="rules" :model="form">
  <uni-forms-item name="receiver" class="form-item">
    <text class="label">收货人</text>
    <input class="input" placeholder="请填写收货人姓名" v-model="form.receiver" />
  </uni-forms-item>
</uni-forms>
```

在提交时，进行校验

```js
// 表单组件实例
const formRef = ref<UniHelper.UniFormsInstance>()

// 提交表单
const onSubmit = async () => {
  try {
    // 表单校验
    await formRef.value?.validate?.()
  } catch(e) {
    // 校验失败
  }
}
```



### 滑动操作 uni-swipe-action

```html
<uni-swipe-action>
  <uni-swipe-action-item>
    <view>
      <text>使用插槽</text>
    </view>
    
    <!-- 右侧插槽 -->
    <template #right>
      <button>删除</button>
    </template>
  </uni-swipe-action-item>
</uni-swipe-action>
```



## 5.2、SKU模块



# 其他

## TypeScript

### Required

将类型里的所有属性都标识为必选项

```javascript
Required<PageParams>
```

### InstanceType

实例类型

```typescript
InstanceType<type of Component>
```

### 交叉类型

为原有的类型，添加属性，获得新的类型

```typescript
type HotParams = PageParams & { subType?: string }
```

### 枚举类型

`enum` 枚举类型

```typescript
enum SkuMode {
  Both = 1,
  Cart = 2,
  Buy = 3
}
```



## 生成随机图片

可以在 url 上设置图片的宽度和高度

http://picsum.photos/200/300



