# react-transport

Transports your React component to the outside of React rendering tree.

![bootstrap](https://raw.githubusercontent.com/kuy/react-transport/master/images/bootstrap.png)

## Unstable

This package is not stable. The API will be changed frequently. I don't recommend use in production.

## Usage

Just wrap your React components with `<Transport>` and tell destination via `to` props.

```
import Transport from 'react-transport';

class MyComponent extends React.Component {
  render() {
    const { count } = this.props;
    return <div>
      <h2>Inside: {count}</h2>
      <Transport to="#outside">
        <h2>Outside: {count}</h2>
      </Transport>
    </div>;
  }
}
```

## Examples

```
npm install
```

### Bootstrap

Renders React components to detached DOM tree.

```
npm run bootstrap
```

### Chrome extension for Gmail

Shows online status of Slack members in Gmail.

```
npm run gmail
```

![gmail-1](https://raw.githubusercontent.com/kuy/react-transport/master/images/gmail-01.png)

![gmail-2](https://raw.githubusercontent.com/kuy/react-transport/master/images/gmail-02.png)

## API

`react-transport` provides `<Transport />` component.

### `<Transport />`

#### `to`: string | HTMLElement [Required]

The destination of transportation. You can use CSS Selector to point it.
The (real) HTML element is also acceptable.

#### `replace`: bool

This is a default behavior of transportation.

##### HTML and JSX

```html
<body>
  <h1>React</h1>
  <div id="outside" />
</body>
```

```jsx
<Transport append to="#outside">
  <span>Hello</span>
</Transport>
```

##### Result

```html
<body>
  <h1>React</h1>
  <div id="outside">
    <div>
      <span>Hello</span>
    </div>
  </div>
</body>
```

#### `append`: bool

Please use this when you want to insert your React component to the end of the destination.

##### HTML and JSX

```html
<body>
  <h1>React</h1>
  <div id="outside">
    <p>Bla Bla Bla</p>
  </div>
</body>
```

```jsx
<Transport append to="#outside">
  <span>Hello</span>
</Transport>
```

##### Result

```html
<body>
  <h1>React</h1>
  <div id="outside">
    <p>Bla Bla Bla</p>
    <div>
      <span>Hello</span>
    </div>
  </div>
</body>
```

#### `prepend`: bool

##### HTML and JSX

```html
<body>
  <h1>React</h1>
  <div id="outside">
    <p>Bla Bla Bla</p>
  </div>
</body>
```

```jsx
<Transport prepend to="#outside">
  <span>Hello</span>
</Transport>
```

##### Result

```html
<body>
  <h1>React</h1>
  <div id="outside">
    <div>
      <span>Hello</span>
    </div>
    <p>Bla Bla Bla</p>
  </div>
</body>
```

#### `wrapBy`: string | function

You can change wrapper element by using this option. In default, your component is wrapped with `div` tag.

##### HTML and JSX

```html
<body>
  <h1>React</h1>
  <div id="outside" />
</body>
```

```jsx
<Transport to="#outside" wrapBy="ul">
  <li>Hello</li>
  <li>World</li>
</Transport>
```

##### Result

```html
<body>
  <h1>React</h1>
  <div id="outside">
    <ul>
      <li>Hello</li>
      <li>World</li>
    </ul>
  </div>
</body>
```

If you pass a function, it will call with `children` as first argument.

##### HTML and JSX

```html
<body>
  <h1>React</h1>
  <div id="outside" />
</body>
```

```jsx
<Transport to="#outside" wrapBy={children => <ul className="dropdown" onClick={this.handleClick}>{children}</ul>}>
  <li>Hello</li>
  <li>World</li>
</Transport>
```

##### Result

```html
<body>
  <h1>React</h1>
  <div id="outside">
    <ul class="dropdown">
      <li>Hello</li>
      <li>World</li>
    </ul>
  </div>
</body>
```

## Caveat

`<Transport />` component doesn't work for server-side rendering.

## Author

Yuki Kodama / [@kuy](https://twitter.com/kuy)
