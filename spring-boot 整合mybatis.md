# spring-boot 整合mybatis

----------
2018/7/2 16:01:15 

pom.xml配置

    <dependency>
		<groupId>org.mybatis.spring.boot</groupId>
		<artifactId>mybatis-spring-boot-starter</artifactId>
		<version>1.3.1</version>
	</dependency>

#### Druid Spring Boot Starter 用于帮助你在Spring Boot项目中轻松集成Druid数据库连接池和监控。

在 Spring Boot 项目中加入druid-spring-boot-starter依赖

    <dependency>
		<groupId>com.alibaba</groupId>
		<artifactId>druid-spring-boot-starter</artifactId>
		<version>1.1.8</version>
	</dependency>

创建后台监控  （/config/DruidConfig）


    @ConfigurationProperties(prefix = "spring.datasource")
    @Bean
    public DataSource druid(){
        return new DruidDataSource();
    }
    //配置druid的监控
    //配置一个管理后台的servlet
    @Bean
    public ServletRegistrationBean statViewServlet(){
        ServletRegistrationBean bean = new ServletRegistrationBean(new StatViewServlet(),"/druid/*");
        Map<String,String> initParams = new HashMap<>();
        initParams.put("loginUsername","admin");
        initParams.put("loginPassword","123456");
        bean.setInitParameters(initParams);
        return bean;
    }
    @Bean
    public FilterRegistrationBean webStatFilter(){
        FilterRegistrationBean bean = new FilterRegistrationBean();
        bean.setFilter(new WebStatFilter());

        Map<String,String> initParams = new HashMap<>();

        initParams.put("exclusions","*.js,*.css,/druid/*");

        bean.setInitParameters(initParams);

        bean.setUrlPatterns(Arrays.asList("/*"));
        return bean;
    }


### 数据库建表



### 创建javabean

(/bean/blog_user)

    package com.liuxiuqian.blog.bean;

	import java.sql.Date;
	public class blog_user {
	    private Integer id;
	    private String user_name;
	    private String user_password;
	    private Date create_time;
	    private Date updata_time;
	    private Integer logic_del;
	
	    public Integer getId() {
	        return id;
	    }
	
	    public void setId(Integer id) {
	        this.id = id;
	    }
	
	    public String getUser_name() {
	        return user_name;
	    }
	
	    public void setUser_name(String user_name) {
	        this.user_name = user_name;
	    }
	
	    public String getUser_password() {
	        return user_password;
	    }
	
	    public void setUser_password(String user_password) {
	        this.user_password = user_password;
	    }
	
	    public Date getCreate_time() {
	        return create_time;
	    }
	
	    public void setCreate_time(Date create_time) {
	        this.create_time = create_time;
	    }
	
	    public Date getUpdata_time() {
	        return updata_time;
	    }
	
	    public void setUpdata_time(Date updata_time) {
	        this.updata_time = updata_time;
	    }
	
	    public Integer getLogic_del() {
	        return logic_del;
	    }
	
	    public void setLogic_del(Integer logic_del) {
	        this.logic_del = logic_del;
	    }
	}
