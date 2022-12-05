# Dùng props và propsType

_**Nhận props cách 1**_

> Truyền bao nhiêu lấy bấy nhiêu

```php

<div {... props}></div>

```

_**Nhận props cách 2**_

> Truyền tất cả trừ 1 vài cái

```php

<div { "tên props muốn loại bỏ" , ... props}></div>

```

_**Nhận props cách 3**_

> detructuring js

```php

function hello() {
    const {... rest } = props;
    ...
}
```

_** Đổi tên props **_

```php

function hello() {
    const {helo: helo123, ... rest } = props;
    ...
}
```
