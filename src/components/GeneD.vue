<template>
  <div id="genoType-content">
    <loading v-if="loading"></loading>
    <div class="title">
      ABC
    </div>
    <div class="title-list">
      <div @click="changeContent" data-type="0" class="title-single active">基本信息</div>
      <div @click="changeContent" data-type="1" class="title-single">OMIM信息</div>
    </div>

    <div class="detail-content" id="detail-content">

      <div class="content-0" :class="{hide:!in0}">
        <div class="row">
          <div class="col-md-6">
            <span><span class="bold">基因名：</span><span v-if="geneData.name" class="">{{geneData.name.symbol}}</span></span>
            <span><span class="bold">基因ID：</span><span class="">{{geneData.geneId}}</span></span>
            <span><span class="bold">同义名：</span><span class="" v-if="geneData.name && geneData.name.synonyms">{{geneData.name.synonyms.join('|')}}</span></span>
            <span><span class="bold">常用转录本：</span><span class="" v-if="geneData.tags">{{geneData.tags.transcript}}</span></span>
            <span><span class="bold">mimNumber：</span><span class="" v-if="geneData.mimNumber">{{geneData.mimNumber.join('|')}}</span></span>
            <span><span class="bold">Panel：</span>
              <span v-for="singlePanel in geneData.panels" class="">
                <span v-if="singlePanel.panel">{{singlePanel.panel.name_cn}}({{singlePanel.panel.code}})</span>
              </span>
            </span>
          </div>
          <div class="col-md-6">
            <span class="database-title"><span class="bold">数据库：</span>
               <span v-if="geneData.dbXrefs" class="database-content">
                <span v-if="geneData.dbXrefs.MIM">MIM：{{geneData.dbXrefs.MIM.join(',')}}</span>
                <span v-if="geneData.dbXrefs.Vega">Vega：{{geneData.dbXrefs.Vega.join(',')}}</span>
                <span v-if="geneData.dbXrefs.HGNC">HGNC：{{geneData.dbXrefs.HGNC.join(',')}}</span>
                <span v-if="geneData.dbXrefs.HPRD">HPRD：{{geneData.dbXrefs.HPRD.join(',')}}</span>
                <span v-if="geneData.dbXrefs.Ensembl">Ensembl：{{geneData.dbXrefs.Ensembl.join(',')}}</span>
               </span>
            </span>
            <span><span class="bold">印记基因：</span><span class="" v-if="geneData.tags">{{geneData.tags.isImprinted ? '是' : '否'}}</span></span>
            <span><span class="bold">其他名称：</span><span class="" v-if="geneData.name">{{geneData.name.fullnameFna}}</span></span>
            <span><span class="bold">位置：</span><span class="" v-if="geneData.location">{{geneData.location.mapLocation}}</span></span>
            <span><span class="bold">基因类型：</span><span class="" v-if="geneData.information">{{geneData.information.genetype}}</span></span>
          </div>
        </div>
      </div>
      <div class="content-1" :class="{hide:!in1}">
        <div class="one-omim" v-for="omSingle in omimData">
          <span><span class="bold">OMIM：</span><span class="">{{omSingle.titles.preferred}}{{omSingle.mimNumber}}({{omSingle.prefix}}{{omSingle.titles.preferred}})</span></span>
          <span><span class="bold">中文标题：</span><span class="">{{omSingle.titles.chinese}}</span></span>
          <span>
            <span class="bold">副标题：</span>
            <span v-if="omSingle.titles.alternatives">
                  <span v-for="altSingle in omSingle.titles.alternatives">{{altSingle}}</span>
            </span>
            <span v-else=""> - </span>
          </span>
          <span>
            <span class="bold">疾病信息：</span>
            <table class="my-table" v-for="phenotypeMap in omSingle.phenotypeMapArr">
              <tbody>
              <tr class="tr-bc">
                <td>Location</td>
                <td>Phenotype</td>
                <td>Phenotype OMIM</td>
                <td>Inheritance</td>
              </tr>
              <tr>
                <td>{{location}}</td>
                <td>{{phenotypeMap.phenotype.title}}</td>
                <td>{{phenotypeMap.phenotype.mimNumber}}</td>
                <td>
                  <span v-for="single in phenotypeMap.phenotype.inheritance">
                    {{single.ab}}
                  </span>
                </td>
              </tr>
              </tbody>
            </table>

            <table class="my-table">
              <tbody>
              <tr class="tr-bc">
                <td colspan="3">OMIM：{{omSingle.mimNumber}}</td>
              </tr>
              <tr>
                <td>#</td>
                <td>ClinicalPhenotye</td>
                <td>HPO</td>
              </tr>
              <tr v-for="data in sortSyn(omSingle.clinicalSynopsis)">

              </tr>
              </tbody>
            </table>

          </span>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        geneId: this.$route.query.geneID,
        geneData: '',
        loading: true,
        in0: true,
        in1: '',
        location: '',
        omimData: '',
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
        ]
      }
    },
    mounted: function () {
      this.geneId = '5959a8d2ccaa6c4d2b39f402';
      this.getData();
    },
    methods: {
      getData: function () {
        const _vue = this;
        this.myAxios({
          method: "get",
          url: 'knowledge/gene/' + _vue.geneId + '/',
        }).then(function (resp) {
          if (resp.data.omims.length === 0) {
            _vue.loading = false;
          }
          _vue.geneData = resp.data;
          _vue.location = resp.data.location.mapLocation;
          _vue.omimData = resp.data.omims;
          const mimNumberStr = resp.data.mimNumber.join(',');

          $.each(resp.data.omims,function (i,data) {
            data.phenotypeMapArr=[];
            $.each(data.phenotypeMaps,function (n,value) {
              if(mimNumberStr.includes(value.gene.mimNumber)){
                data.phenotypeMapArr.push(value)
              }
            })
          });
          console.log(_vue.omimData)
          _vue.loading = false
          /* let count3 = 0;
           $.each(resp.data.omims, function (k3, k4) {
             let count1 = 0;
             let count2 = 0;
             if ($.isEmptyObject(k4.omim.clinicalSynopsis)) {
               k4.noClinicalSynopsis = true
             }
             $.each(k4.omim.clinicalSynopsis, function (n2, data2) {
               data2.name = n2;
               count1 += 1;
               let count = 0; //每个data2里面的值的个数
               $.each(data2, function (n3, data3) {
                 data3.hpoName = '';
                 if (data3.hpo) {
                   _vue.$axios({
                     method: "get",
                     url: 'knowledge/hpo/' + data3.hpo + '/',
                   }).then(function (resp1) {
                     data3.hpoName = resp1.data.titles.chinese;
                     count += 1;
                     if (count === data2.length) {
                       count2 += 1;
                       if (count1 === count2) {
                         count3 += 1;
                         if (resp.data.phenotypeMap.length === count3) {
                           _vue.omimData = resp.data.phenotypeMap;
                           _vue.loading = false;
                         }
                       }
                     }

                   }).catch(function (error) {
                     _vue.catchFun(error)
                   });
                 } else {
                   count += 1;
                   if (count === data2.length) {
                     count2 += 1;
                     if (count1 === count2) {
                       count3 += 1;
                       if (resp.data.phenotypeMap.length === count3) {
                         _vue.omimData = resp.data.phenotypeMap;
                         _vue.loading = false;
                       }
                     }
                   }
                 }
               });
             });
           });*/
        }).catch(function (error) {
          _vue.catchFun(error)
        });
      },
      sortSyn: function (clinicalSynopsis) {
        let arr = [];
        let _vue = this;
        $.each(clinicalSynopsis, function (i, value) { //进来是个对象
          if(!value){
            return;
          }
          if (i === 'dateCreated') { //剔除数据
            return;
          }
          $.each(_vue.sortArr, function (k, data) {
            if (i === data) {
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
      //切换导航
      changeContent: function (event) {
        const _current = $(event.target);
        const current = _current.data("type");
        _current.parent().find('.active').removeClass('active');
        _current.addClass('active');
        this.in0 = '';
        this.in1 = '';
        if (current === 0) {
          this.in0 = true;
//          this.current0();
        } else if (current === 1) {
          this.in1 = true;
//          this.current1();
        }
      },
    }
  }
</script>

<style scoped lang="less">
  @border: rgb(193, 192, 192);
  @tableSha: rgb(185, 184, 184);
  @in: rgb(44, 127, 210);
  @red: rgb(233, 73, 73);

  .title-list {
    width: 486px;
    border-bottom: 1px solid @border;
    font-weight: bold;
    margin-bottom: -1px;
    position: relative;
    z-index: 10;
    .title-single {
      display: inline-block;
      width: 116px;
      height: 27px;
      padding-top: 3px;
      vertical-align: bottom;
      background-color: #fff;
      text-align: center;
      border-top: 1px solid @border;
      border-left: 1px solid @border;
      border-right: 1px solid @border;
      border-top-right-radius: 3px;
      border-top-left-radius: 3px;
      /*margin-left: 3px;*/
      cursor: pointer;
    }
    .title-single:first-child {
      margin: 0;
      box-shadow: -3px 0 5px -2px rgb(200, 200, 200);
    }
    .title-single.active {
      height: 35px;
      border-top: 4px solid rgb(0, 118, 192);
      padding-top: 7px;
      margin-bottom: -1px;
      color: @in;
    }
    .title-single:not(.active) {
      color: rgb(67, 67, 67)
    }
  }

  .title {
    margin-bottom: 15px;
  }

  .detail-content#detail-content {
    min-height: 300px;
    border: 1px solid @tableSha;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    box-shadow: 0 0 20px 3px rgb(200, 200, 200);
    background-color: #fff;
    position: relative;
    padding: 45px;
    .col-md-6 {
      > span {
        display: block;
        padding: 0 0 20px 0;
      }
      .database-title{
        overflow: hidden;
        >span:first-child{
          float: left;
        }
        .database-content{
          float: left;
          >span{
            display: block;
          }
        }
      }

    }
    .one-omim {
      > span {
        display: block;
        padding: 0 0 10px 0;
      }
      margin-bottom: 30px;
      .my-table {
        box-shadow: none;
        border-radius: 0;
        .tr-bc{
          background-color: rgb(246,248,250);
        }
      }
    }
  }
</style>
