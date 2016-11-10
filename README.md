# statque
A little tool to help manage your status by using chainable function

## Install
```javascript
npm install statque
```

## Usage
```javascript
const SQ = require('statque')
const sq = new SQ()//without default status
const sq2 = new SQ(true)//with default status

/********** modify status ************/
sq.use((key, status) => {
  switch (key) {
    case 'key1':
      status = 1
      break
    case 'key2':
      status = 2
      break
  }
  //status MUST be returned
  return status
})

//can be chainable
sq.use((key, status) => {
  if (key === 'key1') {
    status = 3
  }
  return status
})

/************** get status ************/
assert.equal(sq.get('key1'), 3)
assert.equal(sq.get('key2'), 2)
assert.equal(sq.get('nonExistKey'), undefined)
assert.equal(sq2.get('nonExistKey'), true)
```

## Full reference
- constructor `SQ(defaultStatus)`

  ```javascript
  const SQ = require('statque')
  const sq = new SQ({a: 1, b: 2})

  ```
- `.use(fn)`

  ```javascript
    sq.use((key, status) => {
      //key: the key binded with the status
      //status: the status passed by the previous handler

      //status MUST be passed to the next handler
      return status
    })
  ```

- `.get(key)`

  ```javascript
    const status = sq.get('key')
  ```

- `.bind(props)`

   ```javascript
    const sq = new SQ()
    //bind property
    sq.bind({a: 1, b: 2})

    //can be retrieved in use handlers
    sq.use((key, status) => {
      const props = this.props
      assert.deepEqual(props, {a: 1, b: 2})
      return status
    })

  ```