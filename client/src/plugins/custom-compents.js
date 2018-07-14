import Vue from 'vue';
import CCard from '~/components/layouts/manage/content-card';
import PGFilter from '~/components/layouts/manage/page-filter';
import EmptyHolder from '~/components/common/empty-holder';

export default () => {
  Vue.component('ccard', CCard);
  Vue.component('pg-filter', PGFilter);
  Vue.component('empty-holder', EmptyHolder);
};
