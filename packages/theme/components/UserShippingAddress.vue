<template>
  <div>
    <div>{{address.alias}}</div>
    <div>{{address.address1}}</div>
    <div>{{address.address2}}</div>
    <div>{{address.postcode}}</div>
    <div>{{address.city}}</div>
    <div>{{address.country}}</div>
    <div>{{address.phone}}</div>
  </div>
</template>
<script>
export default {
  name: 'UserShippingAddress',
  props: ['address']
};
</script>
