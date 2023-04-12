# @opi_pib/node-translate

Helper tool for generating translation files that works with ngx-translate

-   [Install](#install)
-   [Generate translations](#generate-translations)
-   [Define translation keys](#define-translation-keys)
-   [Default config](#default-config)

## Install

```
npm install @opi_pib/node-translate
```

## Generate translations

Find all translation keys in 'app' and 'domain' folders and generate translation files

```console
translate build --source=\"./src/{app,domain}/**/*+(.ts|.html)\" --langs=pl --langs=en
```

## Define translation keys

### in TypeScript

Every translation key needs to match RegExp which means also that it needs to be used inside of methods translate\$ or instant

```
/[\s\t\[\(\{\.](?:t|translate\$|instant)\(:?\'\w+(:?.\w+)*/
```

If translate\$ or instant methods can't be used, wrap translation key in translation marker 't'

```typescript
const a = t("A.B.C");
```

### in HTML

Every translation key needs to match RegExp which means also that it needs to be passed through 'translate' pipe

```
/\'\w+(?:\.\w+)*\'\s(?:\|\s.+)*?\|\stranslate/
```

#### Example

```html
<div [value]="'J' | async | name | translate"></div>
<div value="{{ 'J.J' | getName: {a: '1'} | translate }}"></div>
<div value="{{ 'J.J.J' | translate: {name: 'Jan'} }}"></div>
```

## Default config

```json
{
	"source": "./src/app/**/*+(.ts|.html)",
	"dist": "./src/translations",
	"i18n": "./src/assets/i18n",
	"langs": ["pl"],
	"reportDuplicates": true
}
```
