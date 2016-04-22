# react-transport

Transports your React component to the outside of React rendering tree.


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


## API

`react-transport` provides `<Transport>` component.

### `<Transport>`

#### `to`: string | HTMLElement [Required]

The destination of transportation. You can use CSS Selector to point it.
The (real) HTML element is also acceptable.

#### `replace`: bool

This is a default behavior of transportation.

#### `append`: bool

Please use this when you want to insert your React component to the end of the destination.

```
<Transport append to="#outside">
  <span>Hello</span>
</Transport>
```

If you have following HTML,

```
<body>
  <h1>React</h1>
  <div id="outside">
    <p>Bla Bla Bla</p>
  </div>
</body>
```

wrapped component will be inserted like this.

```
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

```
<Transport prepend to="#outside">
  <span>Hello</span>
</Transport>
```


## Author

Yuki Kodama / [@kuy](https://twitter.com/kuy)
