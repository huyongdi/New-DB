<template>
  <div id="omim-detail">
    <loading v-if="loading"></loading>
    <div class="title">
      <span class="title-b">医学大数据库</span>
      <span class="title-s">< OMIM详情</span>
    </div>
    <div class="detailShow shadow-top" id="omim-content">
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
              <span v-if="basicResp.titles && basicResp.titles.alternatives.length!=0">{{basicResp.titles.alternatives.join(',')}}</span>
              <span v-else=""> - </span>
            </div>
            <div class="col-md-4 font-12 myCol">
              <span>其他标题：</span>
              <span v-if="basicResp.titles && basicResp.titles.includeds.length!=0">{{basicResp.titles.includeds.join(',')}}</span>
              <span v-else=""> - </span>
            </div>
          </div>
        </div>
      </div>

      <div class="gene-information">
        <span class="gene-information-title">基因信息</span>
        <div class="gene-content">
          <table class="my-table no-thead">
            <tbody id="gene_info">
            <tr class="tr-bc">
              <td>基因</td>
              <td>遗传模式</td>
              <td>表型</td>
            </tr>
            <tr v-for="row in list_gene">
              <td><span>{{row.gene.geneId}}</span></td>
              <td>
                <div v-if="row.phenotype.inheritance" v-for="list in row.phenotype.inheritance">
                  <a class="po" data-toggle="tooltip" data-placement="top" :data-original-title="list.name">{{list.ab}}</a>
                </div>
              </td>
              <td>{{row.phenotype.title}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="gene-information">
        <span class="gene-information-title">表型信息</span>
        <div class="gene-content">
          <table class="table table-bordered">
            <tbody >
            <tr class="tr-bc">
              <td>#</td>
              <td>ClinicalPhenotye</td>
              <td>HPO</td>
            </tr>
            <tr v-for="data in clinicalSynopsis">
              <td>{{data.name}}</td>
              <td>
                <div v-if="data.content" v-for="dataS in data.content">{{dataS.text}}</div>
              </td>
              <td>
                <div v-if="data.content" v-for="list in data.content"><!--getCnName(listHpo)是为了触发get函数-->
                  <div v-if="list.hpos" v-for="listHpo in list.hpos">{{listHpo}}{{getCnName(listHpo)}}(<span :data-id="listHpo" class="hpo-cName"></span>)</div>
                  <div v-if="!list.hpos"> - </div>
                </div>
              </td>
            </tr>

            </tbody>
          </table>
        </div>
      </div>

      <div class="gene-information">
        <span class="gene-information-title">CHPO信息</span>
        <div class="gene-content">
          <table class="table table-bordered font-12">
            <tbody id="CHPO_table">
            <tr>
              <td>HPO ID</td>
              <td class="">中文名</td>
              <td>英文名</td>
            </tr>
            <tr v-for="hpoSingle in basicResp.hpos">
              <td>{{hpoSingle.hpoId}}</td>
              <td>{{hpoSingle.title.chinese}}</td>
              <td>{{hpoSingle.title.english}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="gene-information">
        <span class="gene-information-title">文本信息</span>
        <div class="gene-content" id="gene_text">
          <span v-for="single in textList" class="info-single">
            <span class='geneText-info'>{{single.title}}</span>
            <span class='single' v-for="text in single.content" v-if="text">
              <span></span>{{text}}
            </span>
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
        basicResp: '',
        hpoArr: [],
        availableHPOCount: 0,
        loading: true
      }
    },
    created: function () {
      const _vue = this;
      this.myAxios({
        url: 'knowledge/omim/' + this.$route.query.id + "/",
      }).then(function (resp) {
        _vue.basicResp = resp.data; //基本信息
        _vue.list_gene = resp.data.phenotypeMaps; //基因信息
        _vue.availableHPOCount=0;
        _vue.clinicalSynopsis = _vue.sortSyn(resp.data.clinicalSynopsis); //表型信息
        _vue.textList = resp.data.textSections; //文本信息
      }).catch(function (error) {
        _vue.catchFun(error)
      });
    },
    updated: function () {
      $('[data-toggle="tooltip"]').tooltip();
    },
    methods: {
      getCnName: function (hpoId) {
        const _vue = this;
        _vue.myAxios({
          url: 'knowledge/hpo/?hpoid=' + hpoId
        }).then(function (resp) {
          const data = resp.data.results[0];
          const id = data.hpoId;
          _vue.hpoArr.push({
            hpoId:id,
            hpoName:data.title.chinese?data.title.chinese:data.title.english
          });

          $('.hpo-cName').each(function () {
            const id = $(this).data('id');
            const _this = $(this);
            $.each(_vue.hpoArr,function (n,value) {
              if(value.hpoId == id){
                _this.html(value.hpoName)
              }
            })
          });
          _vue.availableHPOCount-=1;
          if(_vue.availableHPOCount === 0){
            _vue.loading = false
          }
        });
      },
      sortSyn: function (clinicalSynopsis) {
        let arr = [];
        let _vue = this;
        $.each(clinicalSynopsis, function (i, value) { //进来是个对象
          if (!value) {
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
          let arrValue = []; //用来替换value值
          $.each(value, function (k1, k2) { //value是个对象
            if (k2) {
              arrValue = arrValue.concat(k2)
            }
          });
          arr.push({name: i, content: arrValue})
        });

        arr = arr.sort(function (a, b) {
          return a.content.code - b.content.code
        });

        /*计算有效hpoId数*/
        $.each(arr,function (k3,k4) {
          $.each(k4.content,function (k5,k6) {
            if(k6.hpos){
              _vue.availableHPOCount+=k6.hpos.length
            }
          })
        });

        return arr
      }
    },
  }
</script>

<style scoped lang="less">

  #omim-content{
    background-color: #fff;
    margin-top: 15px;
    .gene-content{
      font-size: 12px;
    }
  }

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
