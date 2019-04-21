<template>
  <el-form
    ref="filterForm"
    :model="filterForm"
    class="filter-form"
    size="medium"
  >
    <div class="filter-content">
      <div class="flow-item">
        <el-form-item
          label="关键字"
          prop="keyword"
          class="kword"
        >
          <el-input v-model="filterForm.keyword" />
        </el-form-item>
        <el-form-item
          label="标签"
          prop="tag"
        >
          <el-select
            v-model="filterForm.tag"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="tag in tagList"
              :key="tag.id"
              :label="tag.name"
              :value="tag.id"
            />
          </el-select>
        </el-form-item>
      </div>

      <div class="flow-item">
        <el-form-item
          label="分类"
          prop="type"
        >
          <el-radio-group v-model="filterForm.type">
            <el-radio-button label="-1">
              全部
            </el-radio-button>
            <el-radio-button label="1">
              文章
            </el-radio-button>
            <el-radio-button label="2">
              读书
            </el-radio-button>
            <el-radio-button label="3">
              音乐
            </el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="状态"
          prop="state"
        >
          <el-radio-group v-model="filterForm.state">
            <el-radio-button label="-1">
              全部
            </el-radio-button>
            <el-radio-button label="1">
              草稿
            </el-radio-button>
            <el-radio-button label="2">
              发布
            </el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="公开"
          prop="public"
        >
          <el-radio-group v-model="filterForm.public">
            <el-radio-button label="-1">
              全部
            </el-radio-button>
            <el-radio-button label="true">
              公开
            </el-radio-button>
            <el-radio-button label="false">
              私密
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
      </div>

      <el-form-item
        label="创建时间"
        prop="timeRange"
      >
        <!-- <el-radio-group v-model="timeRangeDay" @change="this.pickDayRange" class="pick-day-range">
                    <el-radio-button label="1">今天</el-radio-button>
                    <el-radio-button label="2">三天</el-radio-button>
                    <el-radio-button label="3">一周</el-radio-button>
                  </el-radio-group> -->
        <el-date-picker
          v-model="filterForm.timeRange"
          :picker-options="pickerOptions"
          type="daterange"
          range-separator="到"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="timestamp"
        />
      </el-form-item>
    </div>

    <div class="filter-footer">
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >
          查询
        </el-button>
        <el-button @click="reset">
          重置
        </el-button>
      </el-form-item>
    </div>
  </el-form>
</template>
