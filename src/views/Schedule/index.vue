<template>
  <el-container>
	<el-header>排课系统</el-header>
    <el-main>
      <el-calendar>
        <template
         slot="dateCell"
         slot-scope="{date, data}"
        >
        <p 
		:class="data.isSelected ?'is-selected':''">
			{{data.day.split('-').slice(2).join('')}}
		</p>
		<!-- 排课 编辑菜单 -->
		<el-menu v-if=" data.isSelected&& (state =='schedule'|| state=='edit')"
			@select="handleSelect"
			class="el-menu-demo" mode="horizontal" >
			<el-submenu :index ="state">
				<template slot="title">
					{{state}}
				</template>
			<template v-for="time in timeList">
					<el-submenu :index = time>
						<template slot="title">
							{{time}}
						</template>
							<template v-for="type in typeList">
							<el-submenu :index="type">
								<template slot="title">
									{{type}}
								</template>
								<div v-if="type == 'Team'">
									<template v-for="metaData in teamList">
										<el-menu-item :index="metaData">
												{{metaData}}
										</el-menu-item>
									</template>
								</div>
								<div v-if="type == '课程'">
									<template v-for="metaData in courseList">
										<el-menu-item :index="metaData">
												{{metaData}}
										</el-menu-item>
									</template>
								</div>
								<div v-if="type == '教练'">
									<template v-for="metaData in coachList">
										<el-menu-item :index="metaData">
												{{metaData}}
										</el-menu-item>
									</template>
								</div>
							</el-submenu>
						</template>
					</el-submenu>
					
			</template>
			</el-submenu>
		</el-menu>

		<!-- 考勤菜单 -->
		<el-menu v-if=" data.isSelected&& state =='checkAttend'"
			@select="handleSelect"
			class="el-menu-demo" mode="horizontal" >
			<el-submenu :index ="state">
				<template slot="title">
					{{state}}
				</template>
			<template v-for="time in timeList">
					<el-submenu :index = time>
						<template slot="title">
							{{time}}
						</template>
							<template v-for="course in courseList">
							<el-submenu :index="course">
								<template slot="title">
									{{course}}
								</template>
								<div>
									<el-menu-item index="1">
										 <el-table
											:data="tableData"
											style="width: 100%">
											<el-table-column
											  label="学生名单"
											  prop="name"
											  width="180">
											</el-table-column>
											<el-table-column label="考勤">
												<label 
													:class="tableData.Attend == '签到'?'attend':'absent'"
												>签到</label>
												&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
												<label
													:class="tableData.Attend == '签到'?'attend':'absent'"
													>缺席</label>
											</el-table-column>
										  </el-table>
									</el-menu-item>
								</div>
							</el-submenu>
							</template>
					</el-submenu>
			</template>
			</el-submenu>
		</el-menu>
		</template>
      </el-calendar>
      <el-row>
        <el-col :span="5" :offset="2" >
        <el-button :type="buttonType1" @click="buttonClick('schedule')">&nbsp;排课&nbsp;</el-button>
        </el-col>
          <el-col :span="5" :offset="2" >
        <el-button :type="buttonType2" @click="buttonClick('checkAttend')">&nbsp;考勤&nbsp;</el-button>
        </el-col>
        <el-col :span="5" :offset="2" >
        <el-button :type="buttonType3" @click="buttonClick('edit')" >&nbsp;编辑&nbsp;</el-button>
        </el-col>
        </el-row>
    </el-main>

  </el-container>
</template>
<script>
export default {
  name: 'Schedule',
  data() {
    return {
		coachList : ['杜教练', '赵教练', '熊教练', '林教练', '韩教练' ],
		courseList : ['3-4岁兴趣班', '4-6岁初级足球班', '5-6岁初级篮球班'],
		teamList : ['Team-01', 'Team-02', 'Team-03'],
		typeList : ['Team', '教练', '课程'],
		timeList : ['16:00-17:00', '17:00-18:00', '18:00-19:00'],
		state : 'lookup',
		showMenu : 'none',
		buttonType1:'info',
		buttonType2:'info',
		buttonType3:'info',
		activeIndex: '1',
		tableData:[{
			'name':'林一',
			'Attend':'签到'
		},
		{
			'name':'林一',
			'Attend':'签到'
		},
		{
			'name':'林一',
			'Attend':'签到'
		},
		{
			'name':'林一',
			'Attend':'签到'
		},
		{
			'name':'林一',
			'Attend':'签到'
		}]
    }
  },
  methods: {
	handleEdit(index, row) {
		console.log(index, row);
	},
	handleSelect(index,indexPath){
		console.log(index,indexPath)
	},
    buttonClick(key){
		switch (key){
			case 'schedule':
				this.buttonType1=(this.buttonType1 == 'info')?'success':'info'
				break;
			case 'checkAttend':
				this.buttonType2=(this.buttonType2 == 'info')?'success':'info'
				break;
			case 'edit':
				this.buttonType3=(this.buttonType3 == 'info')?'success':'info'
				break;
			default:
				break;
		}
		if( this.buttonType1 == 'success'||this.buttonType2 == 'success' ||this.buttonType3 == 'success'){
			this.state = key
		}
		else{
			this.state = 'lookup'
			this.showMenu = false
		}
    },
  }
}
</script>
<style lang="scss">
$Green: #69bc38;
$Gray: #cdcdcb;
.el-container{
	.attend {
		text-color: $Green;
	}
	.absent{
		text-color:$Gray;
	}
	.el-header{
		text-align: center;
		font-size : 1.875rem;
	}
	.el-row{
		margin: 0;
		margin-left: 15.625rem;
	}
	
}

.el-icon-arrow-down:before{

    /* display: none; */
  }
.is-selected {
 /*   background-color: #FE8083; */
 /*   color: white; */
  }
</style>

<!-- 
scheduleList : [{
			'16:00-17:00':[{
				'Team': ['Team-01', 'Team-02', 'Team-03']
			},
			{
				'教练':['杜教练', '赵教练', '熊教练', '林教练', '韩教练' ]
			},
			{
				'课程':['3-4岁兴趣班', '4-6岁初级足球班', '5-6岁初级篮球班']
			}],
			'17:00-18:00':[{
				'Team':['Team-01', 'Team-02', 'Team-03']
			},
			{
				'教练':['杜教练', '赵教练', '熊教练', '林教练', '韩教练' ]
			},
			{
				'课程':['3-4岁兴趣班', '4-6岁初级足球班', '5-6岁初级篮球班']
			}],
			'18:00-19:00':[{
				'Team': ['Team-01', 'Team-02', 'Team-03']
			},
			{
				'教练':['杜教练', '赵教练', '熊教练', '林教练', '韩教练' ]
			},
			{
				'课程':['3-4岁兴趣班', '4-6岁初级足球班', '5-6岁初级篮球班']
			}],
			}], -->
<!-- 多级菜单的写法 -->
<!-- 		<el-menu v-if=" data.isSelected&& (state =='schedule'|| state=='edit')"
			@select="selectMenu"
			class="el-menu-demo" mode="horizontal" >
			<el-submenu :index ="state">
				<template slot="title">
					{{state}}
				</template>
			<template v-for="item in scheduleList">
				<template v-for="(data,index) in item">
					<el-submenu :index = index>
						<template slot="title">
							{{index}}
						</template>
						<template v-for=" element in data">
							<template v-for="(list,type) in element">
							<el-submenu :index="type">
								<template slot="title">
									{{type}}
								</template>
								<template v-for="metaData in list">
									<el-menu-item :index="metaData">
											{{metaData}}
									</el-menu-item>
								</template>
							</el-submenu>
						</template>
						</template>
					</el-submenu>
					
				</template>
			</template>
			</el-submenu>
		</el-menu> -->
		