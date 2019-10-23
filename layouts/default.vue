<template>
  <div>
    <nuxt />
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.btn {
  padding: 10px 30px;
  outline: none;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
}
.btn.disabled {
  cursor: default;
}
.btn:hover {
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
}
.btn.disabled:hover {
  box-shadow: none;
}
.btn.fullsize {
  width: 100%;
}

.btn.contained {
  border: none;
}
.btn.contained.danger {
  background-color: #e91e63;
  color: #FFF;
}
.btn.contained.notice {
  background-color: #607d8b;
  color: #FFF;
}
.btn.contained.disabled {
  background-color: #cfd8dc;
  color: #FFF;
}

.btn.outlined {
  background: none;
  border-width: 1px;
  border-style: solid;
}
.btn.outlined.danger {
  border-color: #e91e63;
  color: #e91e63;
}
.btn.outlined.notice {
  border-color: #607d8b;
  color: #607d8b;
}
.btn.outlined.disabled {
  border-color: #cfd8dc;
  color: #cfd8dc;
}

.input-t {
  outline: none;
  border: none;
  border-bottom: 1px solid #424242;
}

</style>
