---
toc: false
---

```js
const version =  'v1.0.2.0'
```

<div style="float: right" >${version}</div>
<h2>Beräkningsverktyg</h2>

<!-- Text? -->

<h5>1. Hur gammal är du?</h5>

```js
const hrs_base = view(Inputs.radio(new Map([
    ['<= 29', 1756],
    ['30-39', 1732],
    ['>= 40', 1700],
    ])))

```

<h5>2. Vilken anställningsform har du?</h5>


```js
var seltitle = view(Inputs.radio(new Map([
  ['Lektor', {'base':0.1, "research": 0.3, "teaching": 0.7, "dev": 0}],
  ['Lektor med docentkompetens', {'base': 0.1, "research" : 0.35, "teaching": 0.65, "dev": 0}],
  ['Professor', {'base': 0.05, "research" : 0.51, "teaching": 0.49, "dev": 0}],
  ['Biträdande Lektor', {'base': 0.05, "research" : 0.51, "teaching": 0.49, "dev": 0}],
  ['Adjunkt', {'base': 0.1, "research" : 0, "teaching": 0.90, "dev": 0.1}],
]),
{disabled : hrs_base == null, width: 500
}))
```

```js
const notitle = {'base':0.00, "research": 0, "teaching": 0, "dev": 0}
const title = seltitle != null ? seltitle  : notitle
```

```js
const max_research_percent = 1 - title['base'] - 0.2
```
<h5>3. Hur stor omfattning har din anställning?</h5>

```js
const deltid = view(Inputs.range([5, 100],
  {
    'step': 1,
      disabled : title == notitle,
    width: 500,
    value: 100
    }))
```

<h5>4. Hur stor andel bidragsfinansierad forskning har du?</h5>

```js
const bidrag = view(Inputs.range([0, Math.round(max_research_percent * 100)],
  {
    'step': 1,
    disabled : title == notitle,
    width: 500
    }))
```


```js
const hrs = hrs_base * deltid / 100
```


```js
const [
  basep,
  teachp,
  re_othp,
] = divideHours(title, bidrag)
```

```js
display([  basep,
  teachp,
  re_othp,
])
```

```js
import divideHours from './scripts/main.js'
import addHours  from './scripts/hours.js'
import buildData from './scripts/matrix.js'
```

```js

var data = buildData (
  basep,
  teachp,
  re_othp,
  bidrag,
)

data = addHours(data, hrs)
```


```js
const totp = data.reduce((a, b) => (a + b.percent), 0)
const total = totp / 100
const tott = Math.round(total * hrs)

const re_allp = data[3].percent + data[2].percent
const re_allt = data[3].hours + data[2].hours

```



<div class="grid grid-cols-1">
  <div class="card">${
    resize((width) => Plot.plot({
      height: Math.max(100, width/10),
      width: width,
      color: { legend: true, scheme: "Dark2"},
      marks: [
        Plot.barX(data, {
          x: 'percent', fill: "name"}),
      ]
    }))
  }</div>
</div>


<h4>  Summering i procent och timmar </h4>


```js
display(
  `\nÖvrig tid:    ${data[0]['percent']}% (${data[0]['hours']} h)\nUndervisning: ${data[1]['percent']}% (${data[1]['hours']} h)\nForskning:    ${re_allp}% (${re_allt} h)\n    Varav bidrag:    ${data[3]['percent']}% (${data[3]['hours']} h)\n    Varav Fakultet*: ${data[2]['percent']}% (${data[2]['hours']} h)\n\nTotal: ${totp}% (${tott} h)`
)
```


<style>

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--sans-serif);
  margin: 4rem 0 8rem;
  text-wrap: balance;
  text-align: center;
}

.hero h1 {
  margin: 1rem 0;
  padding: 1rem 0;
  max-width: none;
  font-size: 14vw;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(30deg, var(--theme-foreground-focus), currentColor);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero h2 {
  margin: 0;
  max-width: 34em;
  font-size: 20px;
  font-style: initial;
  font-weight: 500;
  line-height: 1.5;
  color: var(--theme-foreground-muted);
}

@media (min-width: 640px) {
  .hero h1 {
    font-size: 90px;
  }
}

</style>


```js

function toggleDivVisibility(div_id, display_var) {
  var div = document.getElementById(div_id)

  if (display_var == null || display_var == 0) {
    div.style.visibility = 'hidden';
  } else {
    div.style.visibility = 'visible';
  }
}

```

```js
//| echo: false

toggleDivVisibility('hrs', hrs)

toggleDivVisibility('other', data[0]['hours'])

toggleDivVisibility('teach', data[1]['hours'])

toggleDivVisibility('research', tott)

```



<div class="grid grid-cols-4 gap-4">
  </div>

  <div class="card" id=hrs>
    <h2>Timmar</h2>
    <span class="big">${Math.max(0, hrs).toLocaleString("sv-SE")}</span>
  </div>

  <div class="card" id=other>
    <h2>Övrig tid (${Math.max(0, data[0]['percent']).toLocaleString("sv-SE")} %)</h2>
    <span class="big">${Math.max(0, data[0]['hours']).toLocaleString("sv-SE")}</span>
  </div>

  <div class="card" id=teach>
    <h2>Undervisning (${Math.max(0, data[1]['percent']).toLocaleString("sv-SE")} %)</h2>
    <span class="big">${Math.max(0, data[1]['hours']).toLocaleString("sv-SE")}</span>
  </div>

  <div class="card" id=research>
    <h2>Forskning* (${Math.max(0, re_allp).toLocaleString("sv-SE")} %)</h2>
    <span class="big">${Math.max(0, re_allt).toLocaleString("sv-SE")}</span>
  </div>


</div>

\* För adjunkter avses kompetensutveckling
