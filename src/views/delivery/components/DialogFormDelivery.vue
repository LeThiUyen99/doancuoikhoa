<el-row class="list-delivery__data">
<el-tabs type="card">
  <el-tab-pane :label="$t('confirm_wait')">
    <el-table
      v-loading="loadingTable"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        :label="$t('id')"
        width="100"
      >
        <template slot-scope="scope">{{ `#${scope.row.id}` }}</template>
      </el-table-column>
      <el-table-column
        prop="(orders.map(i=>i.product.name)).join('\n, ')"
        :label="$t('product_name')"
      />
      <el-table-column
        prop="orders.length"
        :label="$t('gross_product')"
      />
      <el-table-column
        prop="total_price"
        :label="$t('total_money')"
      />
      <el-table-column
        :label="$t('logo')"
      >
        <template slot-scope="scope">
          <el-avatar :size="60" :src="scope.row.golfer.avatar">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png">
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        prop="golfer.name"
        :label="$t('user_order')"
      />
      <el-table-column
        prop='(shop_id)? (shops_map[item.shop_id] || "" ):""'
        :label="$t('product_shop')"
      />
    </el-table>
  </el-tab-pane>
  <el-tab-pane :label="$t('wait_delivery')">
    <el-table
      v-loading="loadingTable"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        :label="$t('id')"
        width="100"
      >
        <template slot-scope="scope">{{ `#${scope.row.id}` }}</template>
      </el-table-column>
      <el-table-column
        prop="(orders.map(i=>i.product.name)).join('\n, ')"
        :label="$t('product_name')"
      />
      <el-table-column
        prop="orders.length"
        :label="$t('gross_product')"
      />
      <el-table-column
        prop="total_price"
        :label="$t('total_money')"
      />
      <el-table-column
        :label="$t('logo')"
      >
        <template slot-scope="scope">
          <el-avatar :size="60" :src="scope.row.golfer.avatar">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png">
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        prop="golfer.name"
        :label="$t('user_order')"
      />
      <el-table-column
        prop='(shop_id)? (shops_map[item.shop_id] || "" ):""'
        :label="$t('product_shop')"
      />
    </el-table>
  </el-tab-pane>
  <el-tab-pane :label="$t('delivery')">
    <el-table
      v-loading="loadingTable"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        :label="$t('id')"
        width="100"
      >
        <template slot-scope="scope">{{ `#${scope.row.id}` }}</template>
      </el-table-column>
      <el-table-column
        prop="(orders.map(i=>i.product.name)).join('\n, ')"
        :label="$t('product_name')"
      />
      <el-table-column
        prop="orders.length"
        :label="$t('gross_product')"
      />
      <el-table-column
        prop="total_price"
        :label="$t('total_money')"
      />
      <el-table-column
        :label="$t('logo')"
      >
        <template slot-scope="scope">
          <el-avatar :size="60" :src="scope.row.golfer.avatar">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png">
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        prop="golfer.name"
        :label="$t('user_order')"
      />
      <el-table-column
        prop='(shop_id)? (shops_map[item.shop_id] || "" ):""'
        :label="$t('product_shop')"
      />
      <el-table-column :label="$t('active')">
        <template slot-scope="scope">
          <el-button type="primary" label="Xác nhận" circle @click="onShowDialogEdit(scope.row)" />
          <el-button type="danger" label="Hủy" circle @click="onDeletePromotions(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </el-tab-pane>
  <el-tab-pane :label="$t('delivered')">
    <el-table
      v-loading="loadingTable"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        :label="$t('id')"
        width="100"
      >
        <template slot-scope="scope">{{ `#${scope.row.id}` }}</template>
      </el-table-column>
      <el-table-column
        prop="(orders.map(i=>i.product.name)).join('\n, ')"
        :label="$t('product_name')"
      />
      <el-table-column
        prop="orders.length"
        :label="$t('gross_product')"
      />
      <el-table-column
        prop="total_price"
        :label="$t('total_money')"
      />
      <el-table-column
        :label="$t('logo')"
      >
        <template slot-scope="scope">
          <el-avatar :size="60" :src="scope.row.golfer.avatar">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png">
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        prop="golfer.name"
        :label="$t('user_order')"
      />
      <el-table-column
        prop='(shop_id)? (shops_map[item.shop_id] || "" ):""'
        :label="$t('product_shop')"
      />
    </el-table>
  </el-tab-pane>
  <el-tab-pane :label="$t('canceled')">
    <el-table
      v-loading="loadingTable"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        :label="$t('id')"
        width="100"
      >
        <template slot-scope="scope">{{ `#${scope.row.id}` }}</template>
      </el-table-column>
      <el-table-column
        prop="(orders.map(i=>i.product.name)).join('\n, ')"
        :label="$t('product_name')"
      />
      <el-table-column
        prop="orders.length"
        :label="$t('gross_product')"
      />
      <el-table-column
        prop="total_price"
        :label="$t('total_money')"
      />
      <el-table-column
        :label="$t('logo')"
      >
        <template slot-scope="scope">
          <el-avatar :size="60" :src="scope.row.golfer.avatar">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png">
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        prop="golfer.name"
        :label="$t('user_order')"
      />
      <el-table-column
        prop='(shop_id)? (shops_map[item.shop_id] || "" ):""'
        :label="$t('product_shop')"
      />
    </el-table>
  </el-tab-pane>
  <el-tab-pane :label="$t('return_order')">
    <el-table
      v-loading="loadingTable"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        :label="$t('id')"
        width="100"
      >
        <template slot-scope="scope">{{ `#${scope.row.id}` }}</template>
      </el-table-column>
      <el-table-column
        prop="(orders.map(i=>i.product.name)).join('\n, ')"
        :label="$t('product_name')"
      />
      <el-table-column
        prop="orders.length"
        :label="$t('gross_product')"
      />
      <el-table-column
        prop="total_price"
        :label="$t('total_money')"
      />
      <el-table-column
        :label="$t('logo')"
      >
        <template slot-scope="scope">
          <el-avatar :size="60" :src="scope.row.golfer.avatar">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png">
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        prop="golfer.name"
        :label="$t('user_order')"
      />
      <el-table-column
        prop='(shop_id)? (shops_map[item.shop_id] || "" ):""'
        :label="$t('product_shop')"
      />
      <el-table-column
        prop="customer_reject_content"
        :label="$t('reason')"
      />
    </el-table>
  </el-tab-pane>
</el-tabs>
</el-row>
