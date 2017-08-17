<template>
  <div class="right-content">
    <loading v-if="loading"></loading>
    <location imgClass="gene-small" currentPage="基因"></location>
    <div class="detailShow" id="singleGene">
      <div class="gene-information">
        <span class="gene-information-title">基本信息</span>
        <div class="gene-content">
          <div class="row myRow omIm-value">
            <span>OMIM:</span>
            <span class="font-14">{{basicResp.mimNumber}}({{basicResp.prefix}}
              <span v-if="basicResp.titles">{{basicResp.titles.preferred}})</span>
            </span>
          </div>
          <div class="row myRow">
            <div class="col-md-4 font-12 myCol">
              <span>标题：</span>
              <span v-if="basicResp.titles">{{basicResp.titles.preferred}}({{basicResp.titles.chinese}})</span>
            </div>
            <div class="col-md-4 font-12 myCol">
              <span>别名：</span>
              <span
                v-if="basicResp.titles && basicResp.titles.alternative">{{basicResp.titles.alternative.join(',')}}</span>
            </div>
            <div class="col-md-4 font-12 myCol">
              <span>其他标题：</span>
              <span v-if="basicResp.titles && basicResp.titles.included">{{basicResp.titles.included.join(',')}}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="gene-information">
        <span class="gene-information-title">基因信息</span>
        <div class="gene-content">
          <table class="table table-bordered font-12">
            <thead>
            <tr>
              <td>基因</td>
              <td>遗传模式</td>
              <td>表型</td>
            </tr>
            </thead>
            <tbody id="gene_info">
            <tr v-for="row in list_gene" @click="addBc">
              <td><a href='#' class="a-color">{{row.gene}}</a></td>
              <td>
                <div v-if="row.inheritances.gene.length!=0">
                  <a class="po" data-toggle="tooltip" data-placement="top"
                     :data-original-title="row.inheritances.gene.join(',')">{{row.inheritances.gene_ab.join(',')}}</a>
                </div>
                <div v-else>
                  <a v-if="row.inheritances.phenotype" class="po" data-toggle="tooltip" data-placement="top"
                     :data-original-title="row.inheritances.phenotype.join(',')">{{row.inheritances.phenotype_ab.join(',')}}</a>
                </div>
              </td>
              <td>{{row.phenotype}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="gene-information">
        <span class="gene-information-title">表型信息</span>
        <div class="gene-content">
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>#</th>
              <th>ClinicalPhenotye</th>
              <th>HPO</th>
            </tr>
            </thead>
            <tbody id="synopsis_table">
            <tr class="font-12" v-for="data in sortSyn(clinicalSynopsis)" @click="addBc">
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
            <tr v-if="clinicalSynopsis.length ===0">
              <td colspan="3" class="center">暂无数据</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="gene-information">
        <span class="gene-information-title">CHPO信息</span>
        <div class="gene-content">
          <table class="table table-bordered font-12">
            <thead>
            <tr>
              <th>HPO ID</th>
              <th class="">中文名</th>
              <th>英文名</th>
            </tr>
            </thead>
            <tbody id="CHPO_table">
            <tr v-for="hpoSingle in hpo_list" @click="addBc">
              <td>{{hpoSingle.hpoId}}</td>
              <td>{{hpoSingle.titles.chinese}}</td>
              <td>{{hpoSingle.titles.english}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="gene-information">
        <span class="gene-information-title">文本信息</span>
        <div class="gene-content" id="gene_text">
                    <span v-for="single in textList" class="info-single">
                        <span class='geneText-info'>
                            {{single.textSectionTitle}}
                        </span>
                        <span class='font-12 single' v-for="text in single.textSectionContent.split('\n')">
                            <!--<span v-html="text">-->
                            <!--</span><br>-->
                          {{text}}
                        </span>
                    </span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import topLocation from './global/location'

  export default {
    components: {
      'location': topLocation,
    },
    data: function () {
      return {
        sortArr: [
          "inheritance", "growth", "growthHeight", "growthWeight", "growthOther",
          "headAndNeck", "headAndNeckHead", "headAndNeckFace", "headAndNeckEars", "headAndNeckEyes",
          "headAndNeckNose", "headAndNeckMouth", "headAndNeckTeeth", "headAndNeckNeck", "cardiovascular",
          "cardiovascularHeart", "cardiovascularVascular", "respiratory", "respiratoryNasopharynx", "respiratoryLarynx",
          "respiratoryAirways", "respiratoryLung", "chest", "chestExternalFeatures", "chestRibsSternumClaviclesAndScapulae", "chestBreasts",
          "chestDiaphragm", "abdomen", "abdomenExternalFeatures", "abdomenLiver", "abdomenPancreas", "abdomenBiliaryTract", "abdomenSpleen", "abdomenGastrointestinal", "genitourinary",
          "genitourinaryExternalGenitaliaMale",
          "genitourinaryExternalGenitaliaFemale",
          "genitourinaryInternalGenitaliaMale",
          "genitourinaryInternalGenitaliaFemale",
          "genitourinaryKidneys",
          "genitourinaryUreters",
          "genitourinaryBladder",
          "skeletal",
          "skeletalSkull",
          "skeletalSpine",
          "skeletalPelvis",
          "skeletalLimbs",
          "skeletalHands",
          "skeletalFeet",
          "skinNailsHair",
          "skinNailsHairSkin",
          "skinNailsHairSkinHistology",
          "skinNailsHairSkinElectronMicroscopy",
          "skinNailsHairNails",
          "skinNailsHairHair",
          "muscleSoftTissue",
          "neurologic",
          "neurologicCentralNervousSystem",
          "neurologicPeripheralNervousSystem",
          "neurologicBehavioralPsychiatricManifestations",
          "voice",
          "metabolicFeatures",
          "endocrineFeatures",
          "hematology",
          "immunology",
          "neoplasia",
          "prenatalManifestations",
          "prenatalManifestationsMovement",
          "prenatalManifestationsAmnioticFluid",
          "prenatalManifestationsPlacentaAndUmbilicalCord",
          "prenatalManifestationsMaternal",
          "prenatalManifestationsDelivery",
          "laboratoryAbnormalities",
          "miscellaneous",
          "molecularBasis",
        ],
        textList: [],
        list_gene: [],
        clinicalSynopsis: [],
        hpo_list: [],
        basicResp: '',
        loading: true
      }
    },
    created: function () {
      const _vue = this;
      if(!this.$route.query.omId){
        alert('页面错误');
        this.$router.push('/')
      }
      this.$axios({
        url: 'knowledge/omim/' + this.$route.query.omId + "/",
        method: 'get'
      }).then(function (resp) {
        _vue.basicResp = resp.data; //基本信息
        _vue.list_gene = resp.data.phenotypeMap; //基因信息
        _vue.hpo_list = resp.data.hpos; //CHPO信息
        _vue.textList = resp.data.textSections; //文本信息
        if ($.isEmptyObject(resp.data.clinicalSynopsis)) {
          _vue.loading = false
        }

        let count = 0;
        let  count1=0;
        $.each(resp.data.clinicalSynopsis, function (n2, data2) {
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
                  count1+=1;
                  if(count1 === count){
                    _vue.loading = false;
                  }
                }
              }).catch(function () {
                data2Length += 1;
                if (data2Length === data2.length) {
                  _vue.clinicalSynopsis.push(data2);
                  count1+=1;
                  if(count1 === count){
                    _vue.loading = false;
                  }
                }
              });
            } else {
              data2Length += 1;
              if (data2Length === data2.length) {
                _vue.clinicalSynopsis.push(data2);
                count1+=1;
                if(count1 === count){
                  _vue.loading = false;
                }
              }
            }
          });
        });

//        $.each(resp.data.clinicalSynopsis, function (n2, data2) {
//          count += 1;
//          data2.name = n2;
//          $.each(data2, function (n3, data3) {
//            if (data3.hpo) {
//              _vue.$axios({
//                method: "get",
//                url: 'knowledge/hpo/' + data3.hpo + '/',
//              }).then(function (resp) {
//                data3.hpoName = resp.data.titles.chinese;
//                _vue.loading = false;
//                if (n3 === data2.length - 1) { //如果clinicalSynopsis对象某个属性遍历完了
//                  clinicalSynopsisArr.push(data2);
//                  _vue.clinicalSynopsis = clinicalSynopsisArr;
//                  if (count === clinicalSynopsisArr.length) { ////如果clinicalSynopsis对象所有属性遍历完了
////                    _vue.clinicalSynopsis = clinicalSynopsisArr;
//                    _vue.loading = false
//                  }
//                }
//              }).catch(function (error) {
//                clinicalSynopsisArr.push(data2);
//                _vue.clinicalSynopsis = clinicalSynopsisArr;
////                _vue.catchFun(error)
//              });
//            } else {
//              clinicalSynopsisArr.push(data2);
//              console.log(data2)
//              _vue.clinicalSynopsis = clinicalSynopsisArr;
//              if (n3 === data2.length - 1) {
////                clinicalSynopsisArr.push(data2);
////                _vue.clinicalSynopsis = clinicalSynopsisArr;
//                if (count === clinicalSynopsisArr.length) {
////                  _vue.clinicalSynopsis = clinicalSynopsisArr;
//                  _vue.loading = false
//                }
//              }
//            }
//          });
//        });
      }).catch(function (error) {
        _vue.catchFun(error)
      });
    },
    updated: function () {
      $('[data-toggle="tooltip"]').tooltip();
    },
    methods: {
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
      addBc:function (event) {
        const _tr = $(event.target).closest('tr');
        const _table = _tr.closest('table');
        _table.find('.tr-active').removeClass('tr-active')
        _tr.addClass('tr-active');
      }
    },
  }
</script>

<style scoped>
  .detailShow {
    padding: 20px;
  }

  .gene-information {
    margin: 20px 0;
  }

  .gene-information-title {
    font-size: 16px;
  }

  .single{
    display: block;
    margin: 10px 0;
  }

  .gene-content {
    background-color: #fafafa;
    padding: 20px 50px;
  }

  .omIm-value {
    margin: 0 0 10px 0;
  }
  .geneText-info{
    font-weight: bold;
    display: block;
  }
  .info-single{
    margin: 0 0 20px 0;
    display: block;
  }
</style>
