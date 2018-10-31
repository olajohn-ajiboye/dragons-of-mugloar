<template>
  <div id="shop">
    <button class="btn btn-secondary" :disabled="!fetchId" @click="getShopItems">Go Shopping</button>

    <h2>Gold: {{ getGameData.gold }}</h2>

    <div class="item float-left" v-for="item in getGameShopItems" :key="item.id">
      <button
        class="btn"
        :disabled="(getGameData.hasOwnProperty('gold') && item.cost > getGameData.gold)"
        @click="buyItem(item.id)"
      >Buy</button>

      <span class="cost " title="Cost">{{ item.cost }}</span>
      <span class="bought" title="Purchased item quantity">
        {{ getGameShopBoughtItems.hasOwnProperty(item.id) ? getGameShopBoughtItems[item.id] : 0 }}
      </span>
      <span class="name">{{ item.name }}</span>
    </div>

  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
export default {
  name: 'DragonShop',
  computed: {
      ...mapGetters(['fetchId', 'getGameData', 'getGameShopItems', 'getGameShopBoughtItems']),
    },
    methods: {
      getShopItems() {
        this.$store.dispatch('GET_SHOP_ITEMS')
      },
      buyItem(id) {
        this.$store.dispatch('PURCHASE_SHOP_ITEM', id)
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#shop {
  padding: 1rem;
  margin-top: 1.05rem;
  box-shadow: -2px 5px 11px -1px rgba(18,12,10,1);
  min-height: 120vh;
  font-family: 'Source Sans Pro', sans-serif;
}
#shop .item {
  background-color: #efebe9;
  margin-bottom: 0.3rem;
  padding: 0.3rem;
  min-width:100%;
  border-radius: 0.5rem;
  
}
#shop .item .cost {
  font-weight: bold;
  color: orange; 
  float: left;
  padding-left: 1rem
}
#shop .item .bought {
  font-weight: bold;
  color: #77b08c;
  min-width: 2rem;
  float: right;

}
#shop .item .name {
  font-size: 1rem;
  float:left;
  padding-left: 2rem;
}
#shop .item .btn {
  background-color: #28932f;
  float:left;
}
#shop .item:hover {
  transform: scale(1.05);
  z-index: 1060;
  background-color: #f5f5f5;
}

</style>
