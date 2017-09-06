<template>
  <div id="home">
    <div class="header">
      <home-header></home-header>
    </div>
    <div class="mlr0 containervue">
      <home-left></home-left>
      <div class="rightcon">
        <div class="tTable  body-content">
          <div class="form-group">
            <div class="form-group">
              <div class="page-header">
                表格
              </div>
              <table class="table table-bordered table-responsive table-striped">
                <thead>
                <tr>
                  <th>时间</th>
                  <th>点击数</th>
                  <th>点击数</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in arrayData">
                  <td>{{item.timestamp}}</td>
                  <td>{{item.count}}</td>
                  <td>{{item.count}}</td>
                </tr>
                </tbody>
              </table>
              <div class="pager" id="pager">
                  <span class="form-inline">
                      <select class="form-control" v-model="pagesize" v-on:change="showPage(pageCurrent,$event,true)" number>
                          <option value="10">10</option>
                          <option value="20">20</option>
                          <option value="30">30</option>
                          <option value="40">40</option>
                      </select>
                  </span>
                <span v-for="item in pageCount+1">
                  <span v-if="item==1" class="btn btn-default" v-on:click="showPage(1,$event)" :class="{'disabled':fDisabled}">
                      首页
                  </span>
                  <span v-if="item==1" class="btn btn-default" v-on:click="showPage(pageCurrent-1,$event)" :class="{'disabled':fDisabled}">
                      上一页
                  </span>
                  <span v-if="item==1" class="btn btn-default" v-on:click="showPage(item,$event)">
                      {{item}}
                  </span>
                  <span v-if="item==1&&item<showPagesStart-1" class="btn btn-default disabled">
                      ...
                  </span>
                  <span v-if="item>1&&item<=pageCount-1&&item>=showPagesStart&&item<=showPageEnd&&item<=pageCount" class="btn btn-default" v-on:click="showPage(item,$event)">
                      {{item}}
                  </span>
                  <span v-if="item==pageCount&&item>showPageEnd+1" class="btn btn-default disabled">
                      ...
                  </span>
                  <span v-if="item==pageCount" class="btn btn-default" v-on:click="showPage(item,$event)"  >
                      {{item}}
                  </span>
                  <span v-if="item==pageCount" class="btn btn-default" v-on:click="showPage(pageCurrent+1,$event)" :class="{'disabled':lDisabled}">
                      下一页
                  </span>
                  <span v-if="item==pageCount" class="btn btn-default" v-on:click="showPage(pageCount,$event)" :class="{'disabled':lDisabled}">
                      尾页
                  </span>
                </span>
                <span>{{pageCurrent}}/{{pageCount}}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>
<script >
  import homeHeader from  '../components/header.vue'
  import homeLeft from '../components/left.vue'
  export default {

    data(){
      return{
        //为第一页或者最后一页时，首页，尾页不能点击
        fDisabled:false,
        lDisabled:false,
        //总项目数
        totalCount: 200,
        //分页数
        pageCount: 20,
        //当前页面
        pageCurrent: 1,
        //分页大小
        pagesize: 10,
        //显示分页按钮数
        showPages: 11,
        //开始显示的分页按钮
        showPagesStart: 1,
        //结束显示的分页按钮
        showPageEnd: 100,
        //分页数据
        arrayData: []
      }
    },
    components: {
      homeHeader : homeHeader,
      homeLeft : homeLeft,
    },
    methods:{
      showPage(pageIndex, $event, forceRefresh){

        if (pageIndex > 0) {
          if (pageIndex > this.pageCount) {
            pageIndex = this.pageCount;
          }
          //判断数据是否需要更新
          var currentPageCount = Math.ceil(this.totalCount / this.pagesize);
          if (currentPageCount != this.pageCount) {
            pageIndex = 1;
            this.pageCount = currentPageCount;
          }
          else if (this.pageCurrent == pageIndex && currentPageCount == this.pageCount && typeof (forceRefresh) == "undefined") {
            console.log("not refresh");
            return;
          }

          //处理分页点中样式
          var buttons = $("#pager").find("span");
          for (var i = 0; i < buttons.length; i++) {
            if (buttons.eq(i).html() != pageIndex) {
              buttons.eq(i).removeClass("active");
            }else {
              buttons.eq(i).addClass("active");
            }
          }

          //测试数据 随机生成的
          var newPageInfo = [];
          var time=new Date();
          for (var i = 0; i < this.pagesize; i++) {
            newPageInfo[newPageInfo.length] = {
              timestamp: time,
              count: (i + (pageIndex - 1) * 20)
            };
          }
          this.pageCurrent = pageIndex;
          this.arrayData = newPageInfo;
          //如果当前页首页或者尾页，则上一页首页就不能点击，下一页尾页就不能点击
          if(this.pageCurrent===1){
            this.fDisabled=true;
          }else if(this.pageCurrent===this.pageCount){
            this.lDisabled=true;
          }else{
            this.fDisabled=false;
            this.lDisabled=false;
          }

          //计算分页按钮数据
          if (this.pageCount > this.showPages) {
            if (pageIndex <= (this.showPages - 1) / 2) {
              this.showPagesStart = 1;
              this.showPageEnd = this.showPages - 1;
              console.log("showPage1")
            }
            else if (pageIndex >= this.pageCount - (this.showPages - 3) / 2) {
              this.showPagesStart = this.pageCount - this.showPages + 2;
              this.showPageEnd = this.pageCount;
              console.log("showPage2")
            }
            else {
              console.log("showPage3")
              this.showPagesStart = pageIndex - (this.showPages - 3) / 2;
              this.showPageEnd = pageIndex + (this.showPages - 3) / 2;
            }
          }
          console.log("showPagesStart:" + this.showPagesStart + ",showPageEnd:" + this.showPageEnd + ",pageIndex:" + pageIndex);
        }
      }
    },
    mounted(){
      this.showPage(this.pageCurrent, null, true);
    },
    computed:{

    }
  }
</script>
<style scoped>
  #home{
    height: 100%;
  }
  .header{

  }
  .containervue{
    height: 100%;
    padding-top: 55px;
  }
  .containervue > div{
    height: 100%;
  }
  .navleft{
    min-height: 100%;

  }
  .rightcon{
    background-color: #f8f8f8;
    border:1px solid #e7e7e7;
    min-height: 100%;
    margin-left: 240px;
    margin-right: 10px;
  }


</style>
