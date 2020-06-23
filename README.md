臺大吃什麼？
===
主題簡介
---
在二月初回臺灣之後，整個月每天都待在宿舍，最大的難題是午餐、晚餐要吃什麼，所以我需要一個有權重的隨機產生器。

隨機生成餐廳的程式感覺蠻老套的，所以我便加入了權重功能，可以減低我不太想吃的餐廳的機率（例如某家廚餘、比較貴的餐廳之類的），也能讓靠近宿舍的餐廳機率提高。

既然要知道附近有什麼餐廳，便須要取得定位資訊，那不如就再加入地圖功能吧。

於是，這個雜七雜八的東西就這樣誕生了。。。

使用方法
---

技術
---
我這次也沒有使用沒有使用 jQuery 和 Bootstrap，新增、刪除 HTML Element 等功能的部分則使用瀏覽器內建的程式處理（語法類似 jQuery）。

### 支援瀏覽器
由於部分使用到的技術較新，所以不支援較舊的瀏覽器和 。目前測試在 Chrome 版本 83、Firefox 版本 77 下運作大致正常，Android 版 Firefox 版本 68 和 iPhone 的 Safari 似乎無法運作。

### CSS 和字體
這次的 CSS 沒有使用到特別多的技術，主要是代替 Bootstrap 的 [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) 跟 [CSS Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox) 而已。

另外使用 [Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)，在手機和電腦上看排版會略為不一樣。

這次的字體使用 Windows 系統內建的「微軟正黑體」或 Mac 系統內建的「蘋方」，以減少不必要字體下載的時間。

+ 註：沒有測試在 Mac 系統下字體是否真的有切換成「蘋方」。

### JavaScript（寫法）
這次用了很多上課沒有提及的寫法，整個過程有點像在寫 Python。。。XD
+ 註：以下寫法是這個網頁在部分手機瀏覽器下不能運作的原因之一。
1. [ES Module](https://pjchender.github.io/2017/10/26/js-javascript-%E6%A8%A1%E7%B5%84%EF%BC%88es-module%EF%BC%89/) — 類似 Python 的 import 語法。
2. [Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) <s>和 [Private class fields 的 `#` 號](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields)</s> — 和 Python 的 Class 有點像，用在 [RandomizerGenerators.js](https://github.com/0500920-0/random-restaurant-generator/blob/master/js/RandomizerGenerators.js)。
3. [Nullish coalescing operator 的 `??`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator) 和 [Optional chaining 的 `?.`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) — 解決 undefined 跟 null 的問題，主要用於 [RandomizerGenerators.js](https://github.com/0500920-0/random-restaurant-generator/blob/master/js/RandomizerGenerators.js)。

### Javascript（API 和程式）
1. `addEventListener`、`createElement` 等 — 代替 jQuery 的程式，主要集中在 [view.js](https://github.com/0500920-0/random-restaurant-generator/blob/master/js/view.js) 和 [index.js](https://github.com/0500920-0/random-restaurant-generator/blob/master/js/index.js)。
2. [Geoloaction API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) — 定位用，寫在 [useGeolocation.js](https://github.com/0500920-0/random-restaurant-generator/blob/master/js/useGeolocation.js)。
3. [半正弦公式](https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula) — 計算兩經緯度的距離，有誤差，但是足夠使用，也是寫在 [useGeolocation.js](https://github.com/0500920-0/random-restaurant-generator/blob/master/js/useGeolocation.js)。

### Javacript（程式庫）
雖然沒有使用 jQuery，但是為了顯示地圖，我還是使用了 [OpenLayers 程式庫](https://openlayers.org/)，地圖由 [OpenStreetMap](https://www.openstreetmap.org/) 提供。

## 2020/06/23 更新內容
1. 由於不少瀏覽器（尤其手機）不支援，故移除 [RandomizerGenerators.js](https://github.com/0500920-0/random-restaurant-generator/blob/master/js/RandomizerGenerators.js) 中的 [Private class fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields)，同時新增支援 Firefox 等瀏覽器。

## 2020/06/22 更新內容
1. 修改地點資料（1.0.0-beta） — 刪除將不再是餐廳的地點「大一女」，修改不清晰的地點「新生南路（大學里）」為「溫州街（新生南路）」。
2. 增加自訂權重功能。
3. [index.html](https://github.com/0500920-0/random-restaurant-generator/blob/master/index.html) 上方說明修改。

## 2020/06/22 建立內容
1. 更換 CDN — 因為使用 [ES Module](https://pjchender.github.io/2017/10/26/js-javascript-%E6%A8%A1%E7%B5%84%EF%BC%88es-module%EF%BC%89/)，連 [unpkg.com](https://unpkg.com/) 之類的 CDN 也不完全支援，所以最後使用 [jspm](https://jspm.org/)。
