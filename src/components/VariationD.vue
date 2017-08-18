<template>
  <div id="vaD-content">
    <loading v-show="loading"></loading>
    <div class="title">
      <span class="title-b">医学大数据库</span>
      <span class="title-s">< 变异</span>
    </div>

    <div class="shadow-top bc-fff">

      <div class="gene-information">
        <span class="gene-information-title">基本信息</span>
        <div class="gene-content">
          <span>变异：{{basicResp.chrom}}:{{basicResp.start}}-{{basicResp.end}}({{basicResp.ref}}/{{basicResp.alt}})</span>
        </div>
      </div>

      <div class="gene-information">
        <span class="gene-information-title">人群频率</span>
        <div class="gene-content">
          <div class="frequency-chart" id="frequency-chart"></div>
        </div>
      </div>

      <div class="gene-information">
        <span class="gene-information-title">DBnsfp</span>
        <div class="gene-content row">
          <div class="col-md-6" id="mit-chart"></div>
          <div class="col-md-6">
            <div class="explain">
              <span class="explain-title">关于pred的说明:</span>
              <span>对于Polyphen2,&nbsp;&nbsp;B:&nbsp;benign&nbsp;&nbsp;P:&nbsp;possibly damaging&nbsp;&nbsp;D:&nbsp;probably damaging</span>
              <span>对于LRT,&nbsp;&nbsp;D:&nbsp;Deleterious&nbsp;&nbsp;N:&nbsp;Neutral&nbsp;&nbsp;U:&nbsp;Unknown</span>
              <span>对于MutationTaster,&nbsp;&nbsp;A:&nbsp;disease_causing_automatic&nbsp;&nbsp;D:&nbsp;disease_causing&nbsp;&nbsp;N:polymorphism&nbsp;&nbsp;P&nbsp;:polymorphism_automatic</span>
              <span>对于MutationAssessor,&nbsp;&nbsp;H:&nbsp;high&nbsp;&nbsp;M:&nbsp;medium&nbsp;&nbsp;L:&nbsp;low&nbsp;&nbsp;N:&nbsp;neutral.</span>
              <span>对于其他各数据库,&nbsp;&nbsp;T:&nbsp;tolerated&nbsp;&nbsp;D:&nbsp;damaging</span>
            </div>
            <table class="my-table no-thead">
              <tbody>
              <tr>
                <td>数据库</td>
                <td v-for="(data,index) in dataBaseArr" v-if="index>=0 &&index<=5">{{data}}
                </td>
              </tr>
              <tr>
                <td>score</td>
                <td v-for="(data,index) in dataBaseData" v-if="index>=0 &&index<=5">{{data.score ? data.score : ' - '}}</td>
              </tr>
              <tr>
                <td>pred</td>
                <td v-for="(data,index) in dataBaseData" v-if="index>=0 &&index<=5">{{data.pred ? data.pred : ' - '}}</td>
              </tr>
              </tbody>
            </table>
            <table class="my-table no-thead">
              <tbody>
              <tr>
                <td>数据库</td>
                <td v-for="(data,index) in dataBaseArr" v-if="index>5">{{data}}
                </td>
              </tr>
              <tr>
                <td>score</td>
                <td v-for="(data,index) in dataBaseData" v-if="index>5">{{data.score ? data.score : ' - '}}</td>
              </tr>
              <tr>
                <td>pred</td>
                <td v-for="(data,index) in dataBaseData" v-if="index>5">{{data.pred ? data.pred : ' - '}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="gene-information">
        <span class="gene-information-title">HGMD（2014-2）</span>
        <div class="gene-content">
          <table class="my-table no-thead">
            <tbody>
            <tr>
              <td>基本信息</td>
              <td>疾病信息</td>
              <td>数据库</td>
            </tr>
            <tr>
              <td colspan="3" v-if="!hgmdData" class="center">暂无数据</td>
            </tr>
            <tr v-if="hgmdData">
              <td>hgmdNumber:&nbsp;{{hgmdData.hgmdNumber}}</td>
              <td>disease:&nbsp;{{hgmdData.disease}}</td>
              <td>uniprot:&nbsp;<span v-if="hgmdData.dbid">{{hgmdData.dbid.uniprot}}</span></td>
            </tr>
            <tr v-if="hgmdData">
              <td>hgnc:&nbsp;{{hgmdData.hgnc}}</td>
              <td>citation:&nbsp;{{hgmdData.citation}}</td>
              <td>rsid:&nbsp;<span v-if="hgmdData.dbid">{{hgmdData.dbid.rsid}}</span></td>
            </tr>
            <tr v-if="hgmdData">
              <td>hgvs:&nbsp;{{hgmdData.hgvs}}</td>
              <td>comments:&nbsp;{{hgmdData.comments}}</td>
              <td>ensembl:&nbsp;<span v-if="hgmdData">{{hgmdData.ensembl}}</span></td>
            </tr>
            <tr v-if="hgmdData">
              <td>snv_raw:&nbsp;<span
                v-if="hgmdData.snvRaw">{{hgmdData.snvRaw.chrom}}:{{hgmdData.snvRaw.start}}-{{hgmdData.snvRaw.end}}({{hgmdData.snvRaw.ref}}/{{hgmdData.snvRaw.alt}}){{hgmdData.snvRaw.strand}}</span>
              </td>
              <td>confidence:&nbsp;{{hgmdData.confidence}}</td>
              <td>omim:&nbsp;<span v-if="hgmdData.dbid">{{hgmdData.dbid.omim}}</span></td>
            </tr>
            <tr v-if="hgmdData">
              <td>密码子改变:&nbsp;<span v-if="hgmdData">{{hgmdData.codNum ? hgmdData.codNum : '-'}}</span></td>
              <td>feature:&nbsp;{{hgmdData.feature}}</td>
              <td>pmid:&nbsp;<span v-if="hgmdData.dbid">
                <a class="common-a" v-for="list in hgmdData.dbid.pmid" :href="'https://www.ncbi.nlm.nih.gov/pubmed/'+list"
                   target="_blank">{{list}}</a>
              </span></td>
            </tr>
            <tr v-if="hgmdData">
              <td>核苷酸改变:&nbsp;<span v-if="hgmdData.change">{{hgmdData.change.nucleotide}}</span></td>
              <td>mutType:&nbsp;<span v-if="hgmdData.type">{{hgmdData.type.mutation}}</span></td>
              <td>hgmdAcc:&nbsp;<span v-if="hgmdData.dbid">{{hgmdData.dbid.hgmdAcc}}</span></td>
            </tr>
            <tr v-if="hgmdData">
              <td>氨基酸改变:&nbsp;<span v-if="hgmdData.change">{{hgmdData.change.aminoacid}}</span></td>
              <td>varType:&nbsp;<span v-if="hgmdData.type">{{hgmdData.type.mutation}}</span></td>
              <td>entrez:&nbsp;<span v-if="hgmdData.dbid">{{hgmdData.dbid.entrez}}</span></td>
            </tr>
            <tr v-if="hgmdData">
              <td colspan="3">genoSeq:&nbsp;{{hgmdData.genoSeq}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="gene-information">
        <span class="gene-information-title">Clinvar（2017-01-30）</span>
        <div class="gene-content">
          <div>CLNACC:
            <span v-if="clinvarData.clnacc">
              <span v-for="list in clinvarData.clnacc">
                <a class="common-a" target="_blank" :href="'https://www.ncbi.nlm.nih.gov/clinvar/'+list" href="">{{list}}</a>&nbsp;&nbsp;
              </span>
            </span>
            <span v-else=""> - </span>
          </div>
          <div>CLINSIG:<span v-if="clinvarData.clinsig">{{clinvarData.clinsig.join('|')}}</span><span v-else=""> - </span></div>
          <div>CLNDBN:<span v-if="clinvarData.clndbn">{{clinvarData.clndbn.join('|')}}</span><span v-else=""> - </span></div>
          <div><span class="pull-left">CLNDSDBS:</span>
            <div class="clnd-conten pull-left">
              <div v-if="clinvarData.clndsdbs" v-for="list in clinvarData.clndsdbs">
                <div v-html="objToArr(list)"></div>
              </div>
            </div>

          </div>

          <!--<div>CLNDSDB:<span v-if="clinvarData.clndsdbs">{{clinvarData.clndsdbs.join('|')}}</span><span v-else=""> - </span></div>-->
          <!--<div>CLNDSDBID:<span v-if="clinvarData.clndsdbid">{{clinvarData.clndsdbid.join('|')}}</span><span v-else=""> - </span></div>-->
        </div>
      </div>

      <div class="gene-information">
        <span class="gene-information-title">GWAS（2015-01-21）</span>
        <div class="gene-content">
          <div class="row">
            <span class="col-lg-4">disease: {{gwasData.disease ? gwasData.disease : '-'}}</span>
            <span class="col-lg-4">orVal: {{gwasData.orVal ? gwasData.orVal : '-'}}</span>
            <span class="col-lg-4">beta: {{gwasData.beta ? gwasData.beta : '-'}}</span>
          </div>
          <div class="row">
            <span class="col-lg-4">
              pubmed:
              <span v-if="gwasData.pubmed">
                <a target="_blank" class="pmid-a" :href="'https://www.ncbi.nlm.nih.gov/pubmed/'+list" v-if="gwasData.pubmed.includes('|')"
                   v-for="list in gwasData.pubmed.split('|')">{{list}}</a>
                <a target="_blank" class="pmid-a" :href="'https://www.ncbi.nlm.nih.gov/pubmed/'+list" v-if="gwasData.pubmed.includes(',')"
                   v-for="list in gwasData.pubmed.split(',')">{{list}}</a>
                <a target="_blank" class="pmid-a" :href="'https://www.ncbi.nlm.nih.gov/pubmed/'+list" v-if="gwasData.pubmed.includes(';')"
                   v-for="list in gwasData.pubmed.split(';')">{{list}}</a>
              </span>
              <span v-else=""> - </span>
            </span>
            <span class="col-lg-4">rsid: {{gwasData.rsid ? gwasData.rsid : '-'}}</span>
            <span class="col-lg-4">pVal: {{gwasData.pVal ? gwasData.pVal : '-'}}</span>
          </div>
        </div>
      </div>

      <div class="gene-information">
        <span class="gene-information-title">线粒体</span>
        <div class="gene-content">
          <table class="my-table no-thead">
            <tbody>
            <tr>
              <td>Mitomap</td>
              <td>Mitimpact</td>
              <td>Mitimpact dbnsfp</td>
            </tr>
            <tr>
              <td>allele:&nbsp;{{MitomapData.allele}}</td>
              <td>mitimpactId:&nbsp;{{MitimpactData.mitimpactId}}</td>
              <td>EFIN_SP:&nbsp;&nbsp;
                <span v-if="MitimpactData.dbnsfp">
                  <span v-if="MitimpactData.dbnsfp.efin_sp">{{MitimpactData.dbnsfp.efin_sp.score}}(score)</span>&nbsp;
                  <span v-if="MitimpactData.dbnsfp.efin_sp">{{MitimpactData.dbnsfp.efin_sp.pred}}(pred)</span>
                </span>
              </td>
            </tr>
            <tr>
              <td>aa_change:&nbsp;{{MitomapData.aaChange}}</td>
              <td>ensemblId:&nbsp;<span v-if="MitimpactData.gene">{{MitimpactData.gene.ensembl.gene}}</span>
              </td>
              <td>EFIN_HD:&nbsp;&nbsp;
                <span v-if="MitimpactData.dbnsfp">
                  <span v-if="MitimpactData.dbnsfp.efin_hd">{{MitimpactData.dbnsfp.efin_hd.score}}(score)</span>&nbsp;
                  <span v-if="MitimpactData.dbnsfp.efin_hd">{{MitimpactData.dbnsfp.efin_hd.pred}}(pred)</span>
              </span>
              </td>
            </tr>
            <tr>
              <td>homo:&nbsp;{{MitomapData.homo}}</td>
              <td>ncbiId:&nbsp;<span v-if="MitimpactData.gene">{{MitimpactData.gene.ncbi.gene}}</span></td>
              <td>Polyphen2:&nbsp;&nbsp;
                <span v-if="MitimpactData.dbnsfp">
                  <span v-if="MitimpactData.dbnsfp.polyphen2">{{MitimpactData.dbnsfp.polyphen2.score}}(score)</span>&nbsp;
                  <span v-if="MitimpactData.dbnsfp.polyphen2">{{MitimpactData.dbnsfp.polyphen2.pred}}(pred)</span>
                </span>
              </td>
            </tr>
            <tr>
              <td>hete:&nbsp;{{MitomapData.hete}}</td>
              <td>symbol:&nbsp;<span v-if="MitimpactData.gene">{{MitimpactData.gene.symbol}}</span></td>
              <td>SIFT:&nbsp;&nbsp;
                <span v-if="MitimpactData.dbnsfp">
                  <span v-if="MitimpactData.dbnsfp.sift">{{MitimpactData.dbnsfp.sift.score}}(score)</span>&nbsp;
                  <span v-if="MitimpactData.dbnsfp.sift">{{MitimpactData.dbnsfp.sift.pred}}(pred)</span>
                </span>
              </td>
            </tr>
            <tr>
              <td>status:&nbsp;{{MitomapData.status}}</td>
              <td>aa_change:&nbsp;
                <span v-if="MitimpactData.aaChange">
                  {{MitimpactData.aaChange.change.ref.aa}}-{{MitimpactData.aaChange.change.alt.aa}}
                </span>
              </td>
              <td>FATHMM:&nbsp;&nbsp;
                <span v-if="MitimpactData.dbnsfp">
                  <span v-if="MitimpactData.dbnsfp.fathmm">{{MitimpactData.dbnsfp.fathmm.score}}(score)</span>&nbsp;
                  <span v-if="MitimpactData.dbnsfp.fathmm">{{MitimpactData.dbnsfp.fathmm.pred}}(pred)</span>
                </span>
              </td>
            </tr>
            <tr>
              <td>locus:&nbsp;{{MitomapData.locus}}</td>
              <td>disease:&nbsp;{{MitimpactData.disease ? MitimpactData.disease : '-'}}</td>
              <td>PROVEAN:&nbsp;&nbsp;
                <span v-if="MitimpactData.dbnsfp">
                  <span v-if="MitimpactData.dbnsfp.provean">{{MitimpactData.dbnsfp.provean.score}}(score)</span>&nbsp;
                  <span v-if="MitimpactData.dbnsfp.provean">{{MitimpactData.dbnsfp.provean.pred}}(pred)</span>
                </span>
              </td>
            </tr>
            <tr>
              <td>disease:&nbsp;{{MitomapData.disease}}</td>
              <td>status:&nbsp;{{MitimpactData.status ? MitimpactData.status : '-'}}</td>
              <td>MutationAssessor:&nbsp;&nbsp;
                <span v-if="MitimpactData.dbnsfp">
                   <span v-if="MitimpactData.dbnsfp.mutationassessor">{{MitimpactData.dbnsfp.mutationassessor.score}}(score)</span>&nbsp;
                  <span v-if="MitimpactData.dbnsfp.mutationassessor">{{MitimpactData.dbnsfp.mutationassessor.pred}}(pred)</span>
                </span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="gene-information">
        <span class="gene-information-title">剪切区域</span>
        <div class="gene-content">
          <div class="one">
            <div class="one-title">dbscSNV</div>
            <div class="row">
              <span class="col-md-6">ada_score:<span v-if="dbData">{{dbData.ada_score ? dbData.ada_score : ' - '}}</span><span
                v-else=""> - </span></span>
              <span class="col-md-6">rf_score:<span v-if="dbData">{{dbData.rf_score ? dbData.rf_score : ' - '}}</span><span
                v-else=""> - </span></span>
            </div>
          </div>
          <div class="one">
            <div class="one-title">spidex</div>
            <div class="row">
              <span class="col-md-6">max_tissue: <span v-if="spiData">{{spiData.maxTissue ? spiData.maxTissue : '-'}}</span><span v-else=""> - </span></span>
              <span class="col-md-6">zscore: <span v-if="spiData">{{spiData.zscore ? spiData.zscore : '-'}}</span><span v-else=""> - </span></span>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  const echarts = require('echarts');
  export default {
    data: function () {
      return {
        basicResp: '',

        deData: '',
        hgmdData: '',
        clinvarData: '',
        gwasData: '',
        MitomapData: '',
        MitimpactData: '',
        dbData: '',
        spiData: '',

        type_0: 0,
        type_1: 0,
        type_2: 0,
        type_3: 0,
        loading: true,

        dataBaseArr: [],
        dataBaseData: [],
      }
    },
    mounted: function () {
      const _vue = this;
      _vue.myAxios({
        url: 'database/snv/?query=' + this.$route.query.p,
      }).then(function (resp) {
        _vue.loading = false;
        _vue.basicResp = resp.data.results[0];

        _vue.dbfreq();//绘制人群频率
        _vue.dbnfsp(); //绘制dbnfsp区域
        _vue.fillHgmd();//填充hgmd
        _vue.fillClinvar(); //填充clinvar
        _vue.fillGwas();//填充gwas
        _vue.fillMito();//填充线粒体
        _vue.fillCut();//填充剪切区域


      }).catch(function (error) {
        _vue.catchFun(error)
      })
    },
    methods: {
      dbfreq: function () {
        let mtdb_data;
        let exac_data = this.basicResp.freq.exac ? this.basicResp.freq.exac : {
          "all": 0, //ExAC所有人群频率
          "afr": 0, //ExAC非洲人群频率
          "amr": 0, //ExAC美洲人群频率
          "eas": 0, //ExAC东亚人群频率
          "sas": 0, //ExAC南亚人群频率
          "fin": 0, //ExAC芬兰人群频率
          "nfe": 0, //ExAC非芬兰欧洲人群频率
          "oth": 0  //ExAC其他人群频率
        };
        let g100_data = this.basicResp.freq.onekg ? this.basicResp.freq.onekg : {
          "all": 0, //千人所有人群频率
          "afr": 0, //千人非洲人群频率
          "amr": 0, //千人美洲人群频率
          "eas": 0, //千人东亚人群频率
          "sas": 0, //千人南亚人群频率
          "eur": 0  //千人欧洲人群频率
        };
        let esp_data = this.basicResp.freq.esp6500 ? this.basicResp.freq.esp6500 : {
          "all": 0, //ESP6500si所有人群频率
          "aa": 0,  //ESP6500si_AA人群频率
          "ea": 0   //ESP6500si_EE人群频率
        };
        let grandFreq = this.basicResp.freq.grandfreq ? this.basicResp.freq.grandfreq : 0;
//        mtdb_data = this.basicResp.mito && this.basicResp.mito.mtdb ? this.basicResp.mito.mtdb : 0;
        mtdb_data = this.basicResp.freq.mtdb ? this.basicResp.freq.mtdb : 0;
        this.dataBaseCharts('frequency-chart', {
          tooltip: {
            trigger: 'axis'
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              axisLabel: {rotate: -30, 'interval': 0},
              data: [{
                value: '本地',
                textStyle: {color: 'red'}
              }, {
                value: 'ExAC东亚',
                textStyle: {color: 'red'}
              }, '\nExAC所有', 'ExAC非洲', '\nExAC美洲', 'ExAC南亚', '\nExAC芬兰', 'ExAC非芬兰欧洲', '\nExAC其他',
                {
                  value: '千人东亚',
                  textStyle: {color: 'red'}
                }, '\n千人所有', '千人非洲', '\n千人美洲', '千人南亚', '\n千人欧洲',
                'ESP6500si所有', '\nESP6500si_AA', 'ESP6500si_EE', {
                  value: 'MTDB',
                  textStyle: {color: 'red'}
                },
              ]
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '频率(%)'
            }
          ],
          series: [
            {
              name: '人群频率(%)',
              type: 'bar',
              data: [
                /*本地*/
                {value: this.filterData(grandFreq.freq), itemStyle: {normal: {color: '#258dc1'}}},
                /*EXAC*/
                {value: this.filterData(exac_data.eas), itemStyle: {normal: {color: '#258dc1'}}},
                {value: this.filterData(exac_data.all), itemStyle: {normal: {color: '#258dc1'}}},
                {value: this.filterData(exac_data.afr), itemStyle: {normal: {color: '#258dc1'}}},
                {value: this.filterData(exac_data.amr), itemStyle: {normal: {color: '#258dc1'}}},
                {value: this.filterData(exac_data.sas), itemStyle: {normal: {color: '#258dc1'}}},
                {value: this.filterData(exac_data.fin), itemStyle: {normal: {color: '#258dc1'}}},
                {value: this.filterData(exac_data.nfe), itemStyle: {normal: {color: '#258dc1'}}},
                {value: this.filterData(exac_data.oth), itemStyle: {normal: {color: '#258dc1'}}},
                /*G100*/
                {value: this.filterData(g100_data.eas), itemStyle: {normal: {color: '#258dc1'}}},
                {value: this.filterData(g100_data.all), itemStyle: {normal: {color: '#258dc1'}}},
                {value: this.filterData(g100_data.afr), itemStyle: {normal: {color: '#258dc1'}}},
                {value: this.filterData(g100_data.amr), itemStyle: {normal: {color: '#258dc1'}}},
                {value: this.filterData(g100_data.sas), itemStyle: {normal: {color: '#258dc1'}}},
                {value: this.filterData(g100_data.eur), itemStyle: {normal: {color: '#258dc1'}}},
                {value: this.filterData(esp_data.all), itemStyle: {normal: {color: '#258dc1'}}},
                {value: this.filterData(esp_data.aa), itemStyle: {normal: {color: '#258dc1'}}},
                {value: this.filterData(esp_data.ea), itemStyle: {normal: {color: '#258dc1'}}},
                {value: this.filterData(mtdb_data), itemStyle: {normal: {color: '#258dc1'}}}
              ],
              markLine: {
                data: [{
                  name: 'Y 轴值为 1的水平线',
                  yAxis: 1
                }, {
                  name: 'Y 轴值为 5的水平线',
                  yAxis: 5
                }
                ]
              }
            }
          ],
          barWidth: '20%'
        });
      },
      dataBaseCharts: function (eleId, option) {
        const myChart = echarts.init(document.getElementById(eleId));
        myChart.setOption(option);
      },

      dbnfsp: function () {
        const _vue = this;
        $.each(_vue.basicResp.dbnsfp, function (key, value) { //遍歷對象
          if (key !== 'gerp') { //剔除gerp
            _vue.dataBaseArr.push(key);
            if (value) {
              _vue.dataBaseData.push(value);
              _vue.doPie(value.pred);
            } else {
              _vue.dataBaseData.push({score: '-', pred: '-'})
            }
          }
        });
        this.dataBaseCharts('mit-chart', {
          title: {
            text: '有害性预测统计',
            subtext: '共十个数据库',
            x: 'right'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['Damaging: D/A/H/M', 'Non-damaging:  B/T/N/P/L/U', 'Undefined: -'],
            right: 50
          },
          series: [
            {
              name: '预测统计',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: this.type_0, name: 'Damaging: D/A/H/M', itemStyle: {normal: {color: '#FF3333'}}},
                {value: this.type_1, name: 'Non-damaging:  B/T/N/P/L/U', itemStyle: {normal: {color: '#66CC33'}}},
                {value: this.type_2, name: 'Undefined: -', itemStyle: {normal: {color: '#666666'}}},
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
      },
      doPie: function (value) {
        if ('D/A/H/M'.indexOf(value) >= 0) {  //Damaging
          this.type_0 += 1;
        } else if ('B/T/N/P/L/U'.indexOf(value) >= 0) { //Non-damaging
          this.type_1 += 1;
        } else { //undefined
          this.type_2 += 1;
        }
      },

      fillHgmd: function () {
        if (this.basicResp.disease && !$.isEmptyObject(this.basicResp.disease.hgmd)) {
          let data = this.basicResp.disease.hgmd;
          data.hgvs = data.hgvs.join(' , ');
          data.citation = data.citation.join(' , ');
//          data.dbid.uniprot = data.dbid.uniprot.join(' , ');
          this.hgmdData = data;
          console.log(this.hgmdData)
        }
      },

      fillClinvar: function () {
        if (this.basicResp.disease && !$.isEmptyObject(this.basicResp.disease.clinvar)) {
          this.clinvarData = this.basicResp.disease.clinvar;
        }
      },

      fillGwas: function () {
        if (this.basicResp.gwas) {
          this.gwasData = this.basicResp.gwas;
        }
      },

      fillMito: function () {
        if (this.basicResp.mito && (this.basicResp.mito.mitomap || this.basicResp.mito.mitimpact)) {
          if (this.basicResp.mito.mitomap) {
            this.MitomapData = this.basicResp.mito.mitomap;
          }
          if (this.basicResp.mito.mitimpact) {
            this.MitimpactData = this.basicResp.mito.mitimpact;
          }
        }
      },

      fillCut: function () {
        if (this.basicResp.splicing && (this.basicResp.splicing.dbscSNV || this.basicResp.splicing.spidex)) {
          this.dbData = this.basicResp.splicing.dbscSNV;
          this.spiData = this.basicResp.splicing.spidex;
//          this.loading = false
        }
      },

      objToArr: function (obj) {
        let str = '';
        $.each(obj, function (key, value) {
          str += key + ': ' + value+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
        });
        return str;
      },

      filterData: function (data) { //为0输出0，不存在输出-
        if (data === 0) {
          return 0;
        }
        if (!data) {
          return ' - '
        }
        return data * 100
      }
    },
    filters: {
      objToArr: function (obj) {
        let str = '';
        $.each(obj, function (key, value) {
          str += key + ': ' + value+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
        });
        return str;
      },
//      filterData1: function (data) { //为0输出0，不存在输出-
//        if (data === 0) {
//          return 0;
//        }
//        if (!data) {
//          return ' - '
//        }
//        return data
//      }
    }
  }
</script>

<style scoped lang="less">
  #vaD-content {
    .shadow-top {
      min-height: 300px;
      margin-top: 15px;
      padding: 20px;
      .gene-information {
        clear: both;
        overflow: hidden;
        .frequency-chart {
          width: 100%;
          height: 400px;
          overflow-x: hidden;
          overflow-y: hidden;
        }
        #mit-chart {
          height: 400px;
          overflow-x: auto;
          overflow-y: hidden;
        }
        margin: 20px 0;
        .gene-information-title {
          font-size: 16px;
        }
        .gene-content {
          background-color: #fafafa;
          padding: 20px 50px 0 50px;
        }
        .omIm-value {
          margin: 0 0 10px 0;
        }
        .explain {
          font-size: 12px;
          > span {
            display: block;
            margin: 5px 0;
            word-break: break-all;

          }
        }
        .one {
          margin-bottom: 15px;
        }
      }
    }
  }

</style>
