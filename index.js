module.exports = class SQ {
  constructor (status) {
    this.handlers = []
    this.props = {}
    this.defaultStatus = status
  }

  use (fn) {
    if (typeof fn === 'function') {
      this.handlers.push(fn)
    }
  }

  bind (props) {
    this.props = props
  }

  get (key) {
    return run(this, key)
  }
}

function run (ctx, key) {
  const handlers = ctx.handlers.slice()
  let status = isObj(ctx.defaultStatus) ? Object.assign({}, ctx.defaultStatus) : ctx.defaultStatus
  ctx = {props: ctx.props}
  function next (key, status) {
    if (handlers.length !== 0) {
      const h = handlers.shift()
      status = h.call(ctx, key, status)
      return next(key, status)
    } else {
      return status
    }
  }
  return next(key, status)
}

function isObj (obj) {
  return !!obj && obj.toString() === '[object Object]'
}
