# elx [![NPM version](https://img.shields.io/npm/v/elx.svg?style=flat-square)](https://npmjs.com/package/elx) [![NPM downloads](https://img.shields.io/npm/dm/elx.svg?style=flat-square)](https://npmjs.com/package/elx) [![Build Status](https://img.shields.io/circleci/project/egoist/elx/master.svg?style=flat-square)](https://circleci.com/gh/egoist/elx)

## Install

```bash
$ npm install --save elx
```

## Usage

```js
import {elx} from 'elx'

// a counter in 4 lines
elx('button', 0)
  .on('click', 1)
  .reduce((state, received) => state + received)
  .subscribe((el, state) => el.textContent = state)
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

[MIT](https://egoist.mit-license.org/) © [EGOIST](https://github.com/egoist)
