<template>
  <div class="right-content" id="panel-c">
    <loading v-if="loading"></loading>
    <location imgClass="panel-small" currentPage="Panel协作"></location>
    <button class="btn btn-color init-btn" type="button" @click="init">初始化基因列表</button>

    <table class="table myTable">
      <thead>
      <tr>
        <th>基因ID</th>
        <th>基因名</th>
        <th>别名</th>
        <th>疾病</th>
        <th>Panel</th>
        <th>协作信息</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="list in listS">
        <td>
          <router-link class="po" target="_blank" :to="{ path: '/geneDetail', query: { geneId: list.gene.geneId}}">{{list.gene.geneId}}</router-link>
        </td>
        <td>{{list.gene.symbol}}</td>
        <td>{{list.gene.synonyms.join('|')}}</td>
        <td class="disease-td">
          <div v-for="(disease,index) in list.geneResp" v-if="disease.geneData.phenotypeMap.length !== 0">
            <!--<span :data-geneId="disease.geneId" v-if="list.annotations.geneId.length !==1"
                  :class="{color0:index===0,color1:index%4===1,color2:index%4===2,color3:index%4===3,color4:index%4===0&&index!==0}">
            </span>-->
            <div v-for="diseaseSingle in disease.geneData.phenotypeMap">
              <div v-if="diseaseSingle.inheritances.gene.length!=0">
                        <span class="po font-700 a-color" data-toggle="tooltip" data-placement="top"
                              :data-original-title="diseaseSingle.inheritances.gene.join(',')">
                          [{{diseaseSingle.inheritances.gene_ab.join(',')}}]
                        </span>
                <a class="po" v-if="diseaseSingle.omim.titles.chinese"
                   @click="showHPO(diseaseSingle.omim.mimNumber,diseaseSingle)"
                   data-toggle="tooltip"
                   data-placement="top" :data-original-title='diseaseSingle.phenotype'>
                  {{diseaseSingle.omim.titles.chinese}}
                </a>
                <a v-else @click="showHPO(diseaseSingle.omim.mimNumber,diseaseSingle)">{{diseaseSingle.phenotype}}</a>
                (&nbsp;<a target="_blank"
                          :href="dbHtml+'#/geneOmDetail?&omId='+diseaseSingle.omim.mimNumber"
                          class="color-a">{{diseaseSingle.omim.mimNumber}}
              </a>&nbsp;)

              </div>
              <div v-else>
                        <span class="po font-700 a-color" data-toggle="tooltip" data-placement="top"
                              :data-original-title="diseaseSingle.inheritances.phenotype.join(',')">
                          [{{diseaseSingle.inheritances.phenotype_ab.join(',')}}]
                        </span>
                <a class="po" v-if="diseaseSingle.omim.titles.chinese"
                   @click="showHPO(diseaseSingle.omim.mimNumber,diseaseSingle)"
                   data-toggle="tooltip" data-placement="top"
                   :data-original-title='diseaseSingle.phenotype'>
                  {{diseaseSingle.omim.titles.chinese}}
                </a>
                <a v-else @click="showHPO(diseaseSingle.omim.mimNumber,diseaseSingle)">{{diseaseSingle.phenotype}}</a>
                (&nbsp;<a target="_blank"
                          :href="dbHtml+'#/geneOmDetail?&omId='+diseaseSingle.omim.mimNumber"
                          class="color-a">{{diseaseSingle.omim.mimNumber}}</a>&nbsp;)
              </div>
            </div>
            <!--<span v-if="disease.phenotypeMap.length ===0"> - </span>-->
          </div>
        </td>
        <td>
          <a v-if="list.panelsInfo.length != 0" v-for="panelItem in list.panelsInfo" class="block po" @click="changePanel(list.id)">
          {{panelItem.name}}
          </a>
          <a v-if="list.panelsInfo.length == 0" @click="changePanel(list.id)" class="po change-panel">修改panel</a>
        </td>

        <td><a @click="showPeople(list.id)" class="po"> 查看</a> ({{list.info.length}})</td>

      </tr>
      </tbody>
    </table>

    <pagenation :count="count" :reset="reset" @getCurrent="getCurrent"></pagenation>

    <!--查看HPO的模态框-->
    <div class="modal fade  bs-example-modal-lg" tabindex="-1" id="hpo_detail" role="dialog"
         aria-labelledby="gridSystemModalLabel3">
      <div class="modal-dialog modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="gridSystemModalLabel3">详情</h4>
          </div>
          <div class="modal-body">
            <table class="table table-bordered myTable">
              <thead>
              <tr>
                <th>#</th>
                <th>ClinicalPhenotye</th>
                <th>HPO</th>
              </tr>
              </thead>
              <tbody id="synopsis_table">
              <tr v-if="clinicalSynopsis.length === 0" class="center">
                <td colspan="3">暂无数据</td>
              </tr>
              <tr v-else="" class="font-12" v-for="data in sortSyn(clinicalSynopsis)">
                <td>{{data.name}}</td>
                <td>
                  <div v-for="singleData in data">{{singleData.clinicalPhenotye}}
                  </div>
                </td>
                <td>
                  <div v-for="singleData in data">
                    <span v-if="singleData.hpo">{{singleData.hpo}}({{singleData.hpoName}})</span>
                    <span v-else> - </span>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer analyze-footer">
            <button type="button" class="btn btn-default pull-left" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>

    <!--点击修改panel的模态框-->
    <div class="modal fade " aria-labelledby="gridSystemModalLabe5" tabindex="-1" role="dialog" id="editGeneModal1">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title" id="gridSystemModalLabel5">提交基因信息</h4>
          </div>
          <div class="modal-body" id="modal-panel">
            <div class="row">
              <div class="col-md-2">
                <a :href="dbHtml+'#/panel'" class="toPanel" target="_blank" title="点击跳转到基因页面">Panel信息</a>
              </div>
              <div class="col-md-10 relative">
                <fuzzyQuery placeholder='请输入panel名' :leftData="panelData" :rightData="originalPanelData"
                            title="已选panel"
                            @sendInput="receiveFuzzy"></fuzzyQuery>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default pull-left" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary my-btn" @click="saveEditGene">保存</button>
          </div>
        </div>
      </div>
    </div>

    <!--点击查看的模态框-->
    <div class="modal fade " aria-labelledby="gridSystemModalLabe5" tabindex="-1" role="dialog" id="peopleOperation">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title" >修改信息</h4>
          </div>
          <div class="modal-body" id="people-modal">
            <div class="single" v-for="info in infoData">
              <div class="name">{{info.user}}</div>
              <div class="content">
                <div class="panels" v-for="panel in info.panelsInfo">
                  <div>{{panel.name}}</div>
                </div>
              </div>
            </div>
            <div class="no-data" v-if="infoData.length == 0">暂无任何人修改</div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default pull-left" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import topLocation from './global/location'
  import search from './global/search'
  import pagenation from './global/pagenation'
  import fuzzyQuery from './global/fuzzyQuery.vue'

  export default {
    components: {
      'location': topLocation,
      'search': search,
      'pagenation': pagenation,
      'fuzzyQuery': fuzzyQuery,
    },
    data: function () {
      return {
        loading: '',
        listS: [],
        currentGene: 0,
        clinicalSynopsis: [],

        originalPanelData: [],
        panelData: [],
        infoData:[],

        count: 1,
        current: 1,
        reset: 0
      }
    },
    created: function () {
      this.getList();
      this.getAllPanel();
    },
    methods: {
      getAllPanel:function () {
        const _vue = this;
        this.$axios({
          url: 'product/newpanel/'
        }).then(function (resp) {
          _vue.panelData = [];
          $.each(resp.data.results, function (n, data) {
            _vue.panelData.push({
              key: data.code,
              value: data.name
            })
          });
          _vue.loading = false;
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      getList: function () {
        const _vue = this;
        _vue.loading = true;
        this.$axios({
          url: 'product/panelgene/?page=' + _vue.current
        }).then(function (resp) {
          _vue.count = resp.data.count;

          let genePostData = [];
          $.each(resp.data.results, function (i, value) {
            value.geneResp = [];
            genePostData.push(value.gene.geneId);
          });
          _vue.listS = resp.data.results;
          _vue.$axios({
            url: 'knowledge/gene/dictbygeneids/',
            method: 'post',
            data: {
              geneids: genePostData
            }
          }).then(function (respA) {
            let count0 = 0;
            let count1 = 0;
            $.each(respA.data, function (k3, k4) {
              count1 += 1;
            });
            $.each(respA.data, function (k1, k2) {
              count0 += 1;
              $.each(_vue.listS, function (n1, n2) {
                if (n2.gene.geneId == k2.geneId) {
                  n2.geneResp.push({
                    geneId: k2.geneId,
                    geneData: k2
                  });
                }
                if (count0 === count1) {
                  _vue.loading = false
                }
              });
            });
          }).catch(function (error) {
            _vue.catchFun(error)
          })
        })
      },
      getCurrent: function (data) {
        this.current = data;
        this.reset = 0;
        this.getList();
      },

      /*查看每个人弹框*/
      showPeople:function (id) {
        const _vue = this;
        $.each(_vue.listS,function (i,data) {
          if(data.id == id){
            _vue.infoData = data.info;
          }
        });
        $("#peopleOperation").modal('show')
      },

      /*panel弹框*/
      changePanel: function (id) {
        const _vue = this;
        _vue.currentGene = id;
        this.$axios({
          url: 'product/panelgene/'+id+'/'
        }).then(function (resp) {
          _vue.originalPanelData = [];
          $.each(resp.data.panelsInfo, function (i, data) {
            _vue.originalPanelData.push({
              key: data.code,
              value: data.name
            });
          });
        }).catch(function (error) {
          _vue.catchFun(error);
        });
        $("#editGeneModal1").modal('show')
      },
      receiveFuzzy: function (data) {
        const _vue = this;
        _vue.loading = true;
        this.$axios({
          url: 'product/newpanel/?query=' + data
        }).then(function (resp) {
          _vue.panelData = [];
          $.each(resp.data.results, function (n, data) {
            _vue.panelData.push({
              key: data.code,
              value: data.name
            })
          });
          _vue.loading = false;
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      saveEditGene: function () {
        const _vue = this;
        let panelArr = [];
        $('#right-ul').find('li').each(function () {
          panelArr.push($(this).data('key'))
        });

        this.$axios({
          url: 'product/panelgene/'+_vue.currentGene+'/',
          method: 'patch',
          data: {
            panels: panelArr,
          }
        }).then(function (resp) {
          alert('提交成功');
          $.each(_vue.listS,function (k1,value) {
            if(value.id == resp.data.id){
              console.log(value.id);
              value.panelsInfo = resp.data.panelsInfo;
              value.info = resp.data.info
            }
          });

          $("#editGeneModal1").modal('hide')
        }).catch(function (error) {
          _vue.catchFun(error);
        })
      },

      /*疾病弹框*/
      showHPO: function (id, data) {
        this.loading = !$.isEmptyObject(data.omim.clinicalSynopsis);
        $("#hpo_detail").modal("show");
        this.clinicalSynopsis = [];
        const _vue = this;
        let count = 0;
        let count1 = 0;
        $.each(data.omim.clinicalSynopsis, function (n2, data2) {
          count += 1; //对象里面的key个数
          data2.name = n2;
          let data2Length = 0;
          $.each(data2, function (n3, data3) {
            if (data3.hpo) {
              _vue.$axios({
                method: "get",
                url: 'knowledge/hpo/' + data3.hpo + '/',
              }).then(function (resp) {
                data3.hpoName = resp.data.titles.chinese;
                data2Length += 1;
                if (data2Length === data2.length) {
                  _vue.clinicalSynopsis.push(data2);
                  count1 += 1;
                  if (count1 === count) {
                    _vue.loading = false;
                  }
                }
              }).catch(function () {
                data2Length += 1;
                if (data2Length === data2.length) {
                  _vue.clinicalSynopsis.push(data2);
                  count1 += 1;
                  if (count1 === count) {
                    _vue.loading = false;
                  }
                }
              });
            } else {
              data2Length += 1;
              if (data2Length === data2.length) {
                _vue.clinicalSynopsis.push(data2);
                count1 += 1;
                if (count1 === count) {
                  _vue.loading = false;
                }
              }
            }
          });
        });
      },
      sortSyn: function (clinicalSynopsis) {
        let arr = [];
        let _vue = this;
        $.each(clinicalSynopsis, function (i, value) {
          if (value.name === 'dateCreated') { //剔除数据
            return;
          }
          $.each(_vue.sortArr, function (k, data) {
            if (value.name === data) {
              value.code = k;
            }
          });
          arr.push(value)
        });
        arr = arr.sort(function (a, b) {
          return a.code - b.code
        });
        return arr
      },
      init: function () {
        const _vue = this;
        _vue.loading = true;
        this.$axios({
          url: 'product/panelgene/init/'
        }).then(function (resp) {
          _vue.loading = false;
          alert(resp.data.detail);
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      }
    }
  }
</script>

<style scoped lang="less">
  #panel-c {
    .init-btn.focus, .init-btn:focus, .init-btn:hover {
      color: #fff;
    }
    .init-btn {
      margin-top: 10px;
      margin-left: 100px;
      margin-bottom: 10px;
    }
    .change-panel{
      color: red;
    }
    #people-modal{
      .single{
        margin-bottom: 25px;
        .name{
          font-size: 18px;
          font-weight: bold;
        }
        .content{
          padding-left: 60px;
          margin-top: 5px;
        }
      }

    }
  }

</style>
