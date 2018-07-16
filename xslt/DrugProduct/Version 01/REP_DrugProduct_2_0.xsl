<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
	<xsl:param name="labelFile" select="'https://rawgit.com/HC-IMSD/REP/dan_tempDossierSumm/xslt/hp-ip400-labels.xml'"/>
	<xsl:param name="language" select="'eng'"/>
	<xsl:variable name="labelLookup" select="document($labelFile)"/>
	<xsl:template match="/">
		<html>
			<head>
				<link href="https://lam-dev.hres.ca/rep-dev/GCWeb/css/theme.min.css" type="text/css" rel="stylesheet" />
				<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" type="text/css" rel="stylesheet" />
				<link href="https://lam-dev.hres.ca/rep-dev/dossier/app/styles/rep.css" type="text/css" rel="stylesheet" />
				<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" type="text/javascript" charset="utf-8"></script>
				<script type="text/javascript">
					function addSelectBox(){
						$("span").each(function(item){
							$(this).mouseenter(function(){$(this).css("border", "1px solid black")}).mouseleave(function(){$(this).css("border", "0px")});
						});
					}
					function selectedTab(tab){
						$("ul.nav.nav-tabs li").each(function(index){
							if(tab == index){
								$(this).addClass('active');
							} else {
								$(this).removeClass('active');
							}
						});
						$(".tabpanels").children().each(function(index){
							if(tab == index){
								this.style.setProperty( 'display', 'block', 'important' );
							} else {
								this.style.setProperty( 'display', 'none', 'important' );
							}
						});
					}
					function showDetail(e){
						var next = $(e).next();
						if(next.is(":visible")){
							var child =$(e).find(".fa-caret-down");
							child.removeClass('fa-caret-down');
							child.addClass('fa-caret-right');
							next.removeClass('active');
							next.addClass('out');
						} else {
							var child =$(e).find(".fa-caret-right");
							child.removeClass('fa-caret-right');
							child.addClass('fa-caret-down');
							next.removeClass('out');
							next.addClass('active');
						}
					}
				</script>
			</head>
            <body onload="addSelectBox();">
				<xsl:if test="count(DRUG_PRODUCT_ENROL) &gt; 0"> <xsl:apply-templates select="DRUG_PRODUCT_ENROL"></xsl:apply-templates> </xsl:if>
			</body>
		</html>
	</xsl:template>
	<xsl:template match="DRUG_PRODUCT_ENROL">
		<h1>Product Infromation Template: Regulatory Enrolment Process (REP)</h1>
		<div class="well well-sm" >
			<TABLE border="1" cellspacing="2" cellpadding="2" style="table-layout: fixed; width: 100%;word-wrap: break-word;">
				<TR>
					<TD style="text-align: center;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ENROL_VERSION'"/></xsl:call-template></TD>
					<TD style="text-align: center;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'COMPANY_ID'"/></xsl:call-template></TD>
					<TD style="text-align: center;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'DossierID'"/></xsl:call-template></TD>
					<TD style="text-align: center;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'DateLastSaved'"/></xsl:call-template></TD>
				</TR>
				<TR>
					<TD style="text-align: center;"> <span><xsl:apply-templates select="enrolment_version" /></span> </TD>
					<TD style="text-align: center;"> <span><xsl:apply-templates select="company_id" /></span> </TD>
					<TD style="text-align: center;"> <span><xsl:apply-templates select="dossier_id" /></span> </TD>
					<TD style="text-align: center;"> <span><xsl:apply-templates select="date_saved" /></span> </TD>
				</TR>
			</TABLE>
		</div>
		<section>
			<div class="panel panel-default">
				<div class="panel-heading">
					<h2 class="panel-title"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'DRUG_PRODUCT'"/></xsl:call-template></h2>
				</div>
				<div class="panel-body">										
					<div class="well well-sm" >
						<div class="row">
							<div class="col-xs-12 form-group">
								<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'PROPER_NAME'"/></xsl:call-template></label>
								<div class="col-xs-12"><span style="font-weight:normal;"><xsl:value-of select="proper_name"/></span></div>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-12">
								<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ADDRESS_NOC'"/></xsl:call-template>:</label>
								<table>
									<tr>
										<td>
										<xsl:element name="input">
							                <xsl:attribute name="type">checkbox</xsl:attribute>
							                <xsl:if test=" manufacturer = 'Y'">
							                    <xsl:attribute name="checked"></xsl:attribute>
							                </xsl:if>
							                <xsl:attribute name="disabled">disabled</xsl:attribute>
											<xsl:attribute name="style">float:left;width:40px;</xsl:attribute>
							            </xsl:element>
										<span style="font-weight:normal;padding-left:15px;">
											<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'MANUFACTURER_SPONSOR'"/></xsl:call-template>
										</span>
										</td>
										<td>
										<xsl:element name="input">
							                <xsl:attribute name="type">checkbox</xsl:attribute>
							                <xsl:if test=" mailing = 'Y'">
							                    <xsl:attribute name="checked"></xsl:attribute>
							                </xsl:if>
							                <xsl:attribute name="disabled">disabled</xsl:attribute>
											<xsl:attribute name="style">float:left;width:40px;</xsl:attribute>
							            </xsl:element>
										<span style="font-weight:normal;padding-left:15px;">
											<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'CONTACT_MAILING'"/></xsl:call-template>
										</span>
										</td>
									</tr>
									<tr>
										<td>
										<xsl:element name="input">
							                <xsl:attribute name="type">checkbox</xsl:attribute>
							                <xsl:if test=" manufacturer = 'Y'">
							                    <xsl:attribute name="checked"></xsl:attribute>
							                </xsl:if>
							                <xsl:attribute name="disabled">disabled</xsl:attribute>
											<xsl:attribute name="style">float:left;width:40px;</xsl:attribute>
							            </xsl:element>
										<span style="font-weight:normal;padding-left:15px;">
											<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'THIS_ACTIVITY'"/></xsl:call-template>
										</span>
										</td>
										<td>
										<xsl:element name="input">
							                <xsl:attribute name="type">checkbox</xsl:attribute>
							                <xsl:if test=" manufacturer = 'Y'">
							                    <xsl:attribute name="checked"></xsl:attribute>
							                </xsl:if>
							                <xsl:attribute name="disabled">disabled</xsl:attribute>
											<xsl:attribute name="style">float:left;width:40px;</xsl:attribute>
							            </xsl:element>
										<span style="font-weight:normal;padding-left:15px;">
											<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'CANADIAN_IMPORTER'"/></xsl:call-template>
										</span>
										</td>
									</tr>
								</table>
							</div>
						</div>
						<div class="row"><br/>
						</div>
						<div class="row">
						<div class="col-sm-12 form-group">
							<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'IMPORTER'"/></xsl:call-template></label>
							<TABLE class="table dataTable table-bordered">
								<thead>
								<tr>
									<th style="text-align: center;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'IMP_COMP_ID'"/></xsl:call-template></th>
									<th style="text-align: center;font-weight:bold;" colspan="2"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'IMPORTER_COMPANY_NAME_IF'"/></xsl:call-template></th>
								</tr>
								</thead>
								<xsl:for-each select="importer_record">
								<TR>
									<TD><span><xsl:apply-templates select="./importer_company_id" /></span> </TD>
									<TD colspan="2"> <span><xsl:apply-templates select="./importer_company_name" /></span> </TD>
								</TR>
								</xsl:for-each>
							</TABLE>
						</div>
						</div>
						<div class="row"><br/>
						</div>
						<div class="row">
							<div class="col-xs-12 form-group">
								<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'DrugUse'"/></xsl:call-template>:&#160;
								<span style="font-weight:normal;"><xsl:choose><xsl:when test="$language = 'eng'"><xsl:value-of select="drug_use/@label_en"/></xsl:when><xsl:otherwise><xsl:value-of select="drug_use/@label_fr"/></xsl:otherwise></xsl:choose></span>
								</label>
							</div>
						</div>
						<xsl:if test="drug_use = 'DISINFECT'">
							<div class="row">
							<div class="col-xs-12 form-group">
							<table>
							<tbody>
								<tr><td colspan="3"><label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'DISINFECTANT_TYPE'"/></xsl:call-template></label></td></tr>
								<tr>
									<td>
										<xsl:element name="input">
							                <xsl:attribute name="type">checkbox</xsl:attribute>
							                <xsl:if test=" disinfectant_type/hospital = 'Y'">
							                    <xsl:attribute name="checked"></xsl:attribute>
							                </xsl:if>
							                <xsl:attribute name="disabled">disabled</xsl:attribute>
											<xsl:attribute name="style">float:left;width:40px;</xsl:attribute>
							            </xsl:element>
										<span style="font-weight:normal;padding-left:15px;">
											<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'HOSPITAL'"/></xsl:call-template>
										</span>
									</td>
									<td>
										<xsl:element name="input">
							                <xsl:attribute name="type">checkbox</xsl:attribute>
							                <xsl:if test=" disinfectant_type/food_processing = 'Y'">
							                    <xsl:attribute name="checked"></xsl:attribute>
							                </xsl:if>
							                <xsl:attribute name="disabled">disabled</xsl:attribute>
											<xsl:attribute name="style">float:left;width:40px;</xsl:attribute>
							            </xsl:element>
										<span style="font-weight:normal;padding-left:15px;">
											<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'FOOD_PROCESSING'"/></xsl:call-template>
										</span>
									</td>
									<td>
										<xsl:element name="input">
							                <xsl:attribute name="type">checkbox</xsl:attribute>
							                <xsl:if test=" disinfectant_type/medical_instruments = 'Y'">
							                    <xsl:attribute name="checked"></xsl:attribute>
							                </xsl:if>
							                <xsl:attribute name="disabled">disabled</xsl:attribute>
											<xsl:attribute name="style">float:left;width:40px;</xsl:attribute>
							            </xsl:element>
										<span style="font-weight:normal;padding-left:15px;">
											<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'MEDICAL_INSTRUMENTS'"/></xsl:call-template>
										</span>
									</td>
								</tr>
								<tr>
									<td>
										<xsl:element name="input">
							                <xsl:attribute name="type">checkbox</xsl:attribute>
							                <xsl:if test=" disinfectant_type/domestic = 'Y'">
							                    <xsl:attribute name="checked"></xsl:attribute>
							                </xsl:if>
							                <xsl:attribute name="disabled">disabled</xsl:attribute>
											<xsl:attribute name="style">float:left;width:40px;</xsl:attribute>
							            </xsl:element>
										<span style="font-weight:normal;padding-left:15px;">
											<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'DOMESTIC'"/></xsl:call-template>
										</span>
									</td>
									<td>
										<xsl:element name="input">
							                <xsl:attribute name="type">checkbox</xsl:attribute>
							                <xsl:if test=" disinfectant_type/barn = 'Y'">
							                    <xsl:attribute name="checked"></xsl:attribute>
							                </xsl:if>
							                <xsl:attribute name="disabled">disabled</xsl:attribute>
											<xsl:attribute name="style">float:left;width:40px;</xsl:attribute>
							            </xsl:element>
										<span style="font-weight:normal;padding-left:15px;">
											<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'BARN'"/></xsl:call-template>
										</span>
									</td>
									<td>
										<xsl:element name="input">
							                <xsl:attribute name="type">checkbox</xsl:attribute>
							                <xsl:if test=" disinfectant_type/institutional_industrial = 'Y'">
							                    <xsl:attribute name="checked"></xsl:attribute>
							                </xsl:if>
							                <xsl:attribute name="disabled">disabled</xsl:attribute>
											<xsl:attribute name="style">float:left;width:40px;</xsl:attribute>
							            </xsl:element>
										<span style="font-weight:normal;padding-left:15px;">
											<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'INSTITUTIONAL_INDUSTRIAL'"/></xsl:call-template>
										</span>
									</td>
								</tr>
								<tr>
									<td>
										<xsl:element name="input">
							                <xsl:attribute name="type">checkbox</xsl:attribute>
							                <xsl:if test=" disinfectant_type/contact_lens = 'Y'">
							                    <xsl:attribute name="checked"></xsl:attribute>
							                </xsl:if>
							                <xsl:attribute name="disabled">disabled</xsl:attribute>
											<xsl:attribute name="style">float:left;width:40px;</xsl:attribute>
							            </xsl:element>
										<span style="font-weight:normal;padding-left:15px;">
											<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'CONTACT_LENS'"/></xsl:call-template>
										</span>
									</td>
									<td></td><td></td>
								</tr>
							</tbody>
							</table>
							</div>
							</div>
						</xsl:if>
						<div class="row">
							<div class="col-xs-12 form-group">
								<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'SCHEDULE_PRESC_STATUS'"/></xsl:call-template></label>
								<div class="col-xs-12 checkbox checkbox-pi">
									<xsl:element name="input">
						                <xsl:attribute name="type">checkbox</xsl:attribute>
						                <xsl:if test=" is_sched_c = 'Y'">
						                    <xsl:attribute name="checked"></xsl:attribute>
						                </xsl:if>
						                <xsl:attribute name="disabled">disabled</xsl:attribute>
										<xsl:attribute name="style">float:left;width:40px;</xsl:attribute>
						            </xsl:element>
									<span style="font-weight:normal;padding-left:15px;">
										<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'SCHEDULE_C'"/></xsl:call-template>
									</span>
								</div>
								<div class="col-xs-12 checkbox checkbox-pi">
									<xsl:element name="input">
						                <xsl:attribute name="type">checkbox</xsl:attribute>
						                <xsl:if test=" is_sched_d = 'Y'">
						                    <xsl:attribute name="checked"></xsl:attribute>
						                </xsl:if>
						                <xsl:attribute name="disabled">disabled</xsl:attribute>
										<xsl:attribute name="style">float:left;width:40px;</xsl:attribute>
						            </xsl:element>
									<span style="font-weight:normal;padding-left:15px;">
										<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'SCHEDULE_D'"/></xsl:call-template>
									</span>
								</div>
								<div class="col-xs-12 checkbox checkbox-pi">
									<xsl:element name="input">
						                <xsl:attribute name="type">checkbox</xsl:attribute>
						                <xsl:if test=" is_prescription_drug_list = 'Y'">
						                    <xsl:attribute name="checked"></xsl:attribute>
						                </xsl:if>
						                <xsl:attribute name="disabled">disabled</xsl:attribute>
										<xsl:attribute name="style">float:left;width:40px;</xsl:attribute>
						            </xsl:element>
									<span style="font-weight:normal;padding-left:15px;">
										<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'PRESCRIPTION_DRUG'"/></xsl:call-template>
									</span>
								</div>
								<div class="col-xs-12 checkbox checkbox-pi">
									<xsl:element name="input">
						                <xsl:attribute name="type">checkbox</xsl:attribute>
						                <xsl:if test=" is_regulated_cdsa = 'Y'">
						                    <xsl:attribute name="checked"></xsl:attribute>
						                </xsl:if>
						                <xsl:attribute name="disabled">disabled</xsl:attribute>
										<xsl:attribute name="style">float:left;width:40px;</xsl:attribute>
						            </xsl:element>
									<span style="font-weight:normal;padding-left:15px;">
										<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'REGULATED_CDSA'"/></xsl:call-template>
									</span>
								</div>
								<div class="col-xs-12 checkbox checkbox-pi">
									<xsl:element name="input">
						                <xsl:attribute name="type">checkbox</xsl:attribute>
						                <xsl:if test=" is_non_prescription_drug = 'Y'">
						                    <xsl:attribute name="checked"></xsl:attribute>
						                </xsl:if>
						                <xsl:attribute name="disabled">disabled</xsl:attribute>
										<xsl:attribute name="style">float:left;width:40px;</xsl:attribute>
						            </xsl:element>
									<span style="font-weight:normal;padding-left:15px;">
										<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'IS_NON_PRESCRIPTION_DRUG'"/></xsl:call-template>
									</span>
								</div>
								<div class="col-xs-12 checkbox checkbox-pi">
									<xsl:element name="input">
						                <xsl:attribute name="type">checkbox</xsl:attribute>
						                <xsl:if test=" is_sched_a = 'Y'">
						                    <xsl:attribute name="checked"></xsl:attribute>
						                </xsl:if>
						                <xsl:attribute name="disabled">disabled</xsl:attribute>
										<xsl:attribute name="style">float:left;width:40px;</xsl:attribute>
						            </xsl:element>
									<span style="font-weight:normal;padding-left:15px;">
										<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'NON_PRESC_SCHEDULE_A'"/></xsl:call-template>
									</span>
								</div>
								<xsl:if test="is_sched_a = 'Y'">
								<div class="col-xs-12 form-group">
									<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'SCHEDA_DETAILS'"/></xsl:call-template></label>
									<div class="panel-body" style="border: 1px solid black;">
										<div class="row">
											<p style="padding-left:20px;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'SCHEDA_DESCRIPTION'"/></xsl:call-template></p>
										</div>
										<div class="col-xs-12">
										<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'DIN_FULL'"/></xsl:call-template></label>
											:&#160;&#160;<span><xsl:value-of select="schedule_a_group/din_number"/></span>
										</div>
										<div class="col-xs-12 form-group" style="padding-left: 15px;">
											<div class="col-xs-12">
												<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'SCHEDA_DISEASE'"/></xsl:call-template></label>
												<div class="row checkbox">
													<div class="col-md-4">
														<label>
															<xsl:element name="input">
												                <xsl:attribute name="type">checkbox</xsl:attribute>
												                <xsl:if test=" schedule_a_group/acute_alcohol = 'Y'">
												                    <xsl:attribute name="checked"></xsl:attribute>
												                </xsl:if>
												                <xsl:attribute name="disabled">disabled</xsl:attribute>
												            </xsl:element>
															<span style="font-weight:normal;">
																<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ACUTEALCOHOL'"/></xsl:call-template>
															</span>
														</label>
													</div>
													<div class="col-md-4">
														<label>
															<xsl:element name="input">
												                <xsl:attribute name="type">checkbox</xsl:attribute>
												                <xsl:if test=" schedule_a_group/acute_anxiety = 'Y'">
												                    <xsl:attribute name="checked"></xsl:attribute>
												                </xsl:if>
												                <xsl:attribute name="disabled">disabled</xsl:attribute>
												            </xsl:element>
															<span style="font-weight:normal;">
																<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ACUTEANXIETY'"/></xsl:call-template>
															</span>
														</label>
													</div>
													<div class="col-md-4">
														<label>
															<xsl:element name="input">
												                <xsl:attribute name="type">checkbox</xsl:attribute>
												                <xsl:if test=" schedule_a_group/acute_infectious = 'Y'">
												                    <xsl:attribute name="checked"></xsl:attribute>
												                </xsl:if>
												                <xsl:attribute name="disabled">disabled</xsl:attribute>
												            </xsl:element>
															<span style="font-weight:normal;">
																<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ACUTERESP'"/></xsl:call-template>
															</span>
														</label>
													</div>
												</div>
												<div class="row checkbox">
													<div class="col-md-4">
														<label>
															<xsl:element name="input">
												                <xsl:attribute name="type">checkbox</xsl:attribute>
												                <xsl:if test=" schedule_a_group/acute_inflammatory = 'Y'">
												                    <xsl:attribute name="checked"></xsl:attribute>
												                </xsl:if>
												                <xsl:attribute name="disabled">disabled</xsl:attribute>
												            </xsl:element>
															<span style="font-weight:normal;">
																<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ACUTEINFLAM'"/></xsl:call-template>
															</span>
														</label>
													</div>
													<div class="col-md-4">
														<label>
															<xsl:element name="input">
												                <xsl:attribute name="type">checkbox</xsl:attribute>
												                <xsl:if test=" schedule_a_group/acute_psychotic = 'Y'">
												                    <xsl:attribute name="checked"></xsl:attribute>
												                </xsl:if>
												                <xsl:attribute name="disabled">disabled</xsl:attribute>
												            </xsl:element>
															<span style="font-weight:normal;">
																<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ACUTEPSYCHOTIC'"/></xsl:call-template>
															</span>
														</label>
													</div>
													<div class="col-md-4">
														<label>
															<xsl:element name="input">
												                <xsl:attribute name="type">checkbox</xsl:attribute>
												                <xsl:if test=" schedule_a_group/addiction = 'Y'">
												                    <xsl:attribute name="checked"></xsl:attribute>
												                </xsl:if>
												                <xsl:attribute name="disabled">disabled</xsl:attribute>
												            </xsl:element>
															<span style="font-weight:normal;">
																<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ADDICTION'"/></xsl:call-template>
															</span>
														</label>
													</div>
												</div>
												<div class="row checkbox">
													<div class="col-md-4">
														<label>
															<xsl:element name="input">
												                <xsl:attribute name="type">checkbox</xsl:attribute>
												                <xsl:if test=" schedule_a_group/ateriosclerosis = 'Y'">
												                    <xsl:attribute name="checked"></xsl:attribute>
												                </xsl:if>
												                <xsl:attribute name="disabled">disabled</xsl:attribute>
												            </xsl:element>
															<span style="font-weight:normal;">
																<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ATERIOSCLEROSIS'"/></xsl:call-template>
															</span>
														</label>
													</div>
													<div class="col-md-4">
														<label>
															<xsl:element name="input">
												                <xsl:attribute name="type">checkbox</xsl:attribute>
												                <xsl:if test=" schedule_a_group/appendicitis = 'Y'">
												                    <xsl:attribute name="checked"></xsl:attribute>
												                </xsl:if>
												                <xsl:attribute name="disabled">disabled</xsl:attribute>
												            </xsl:element>
															<span style="font-weight:normal;">
																<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'APPENDICITIS'"/></xsl:call-template>
															</span>
														</label>
													</div>
													<div class="col-md-4">
														<label>
															<xsl:element name="input">
												                <xsl:attribute name="type">checkbox</xsl:attribute>
												                <xsl:if test=" schedule_a_group/asthma = 'Y'">
												                    <xsl:attribute name="checked"></xsl:attribute>
												                </xsl:if>
												                <xsl:attribute name="disabled">disabled</xsl:attribute>
												            </xsl:element>
															<span style="font-weight:normal;">
																<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ASTHMA'"/></xsl:call-template>
															</span>
														</label>
													</div>
												</div>
												<div class="row checkbox">
													<div class="col-md-4">
														<label>
															<xsl:element name="input">
												                <xsl:attribute name="type">checkbox</xsl:attribute>
												                <xsl:if test=" schedule_a_group/cancer = 'Y'">
												                    <xsl:attribute name="checked"></xsl:attribute>
												                </xsl:if>
												                <xsl:attribute name="disabled">disabled</xsl:attribute>
												            </xsl:element>
															<span style="font-weight:normal;">
																<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'CANCER'"/></xsl:call-template>
															</span>
														</label>
													</div>
													<div class="col-md-4">
														<label>
															<xsl:element name="input">
												                <xsl:attribute name="type">checkbox</xsl:attribute>
												                <xsl:if test=" schedule_a_group/congest_heart_fail = 'Y'">
												                    <xsl:attribute name="checked"></xsl:attribute>
												                </xsl:if>
												                <xsl:attribute name="disabled">disabled</xsl:attribute>
												            </xsl:element>
															<span style="font-weight:normal;">
																<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'HEARTCONGEST'"/></xsl:call-template>
															</span>
														</label>
													</div>
													<div class="col-md-4">
														<label>
															<xsl:element name="input">
												                <xsl:attribute name="type">checkbox</xsl:attribute>
												                <xsl:if test=" schedule_a_group/convulsions = 'Y'">
												                    <xsl:attribute name="checked"></xsl:attribute>
												                </xsl:if>
												                <xsl:attribute name="disabled">disabled</xsl:attribute>
												            </xsl:element>
															<span style="font-weight:normal;">
																<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'CONVULSIONS'"/></xsl:call-template>
															</span>
														</label>
													</div>
												</div>
												<div class="row checkbox">
													<div class="col-md-4">
														<label>
															<xsl:element name="input">
												                <xsl:attribute name="type">checkbox</xsl:attribute>
												                <xsl:if test=" schedule_a_group/dementia = 'Y'">
												                    <xsl:attribute name="checked"></xsl:attribute>
												                </xsl:if>
												                <xsl:attribute name="disabled">disabled</xsl:attribute>
												            </xsl:element>
															<span style="font-weight:normal;">
																<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'DEMENTIA'"/></xsl:call-template>
															</span>
														</label>
													</div>
													<div class="col-md-4">
														<label>
															<xsl:element name="input">
												                <xsl:attribute name="type">checkbox</xsl:attribute>
												                <xsl:if test=" schedule_a_group/dementia = 'Y'">
												                    <xsl:attribute name="checked"></xsl:attribute>
												                </xsl:if>
												                <xsl:attribute name="disabled">disabled</xsl:attribute>
												            </xsl:element>
															<span style="font-weight:normal;">
																<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'DEPRESSION'"/></xsl:call-template>
															</span>
														</label>
													</div>
													<div class="col-md-4">
														<label>
															<xsl:element name="input">
												                <xsl:attribute name="type">checkbox</xsl:attribute>
												                <xsl:if test=" schedule_a_group/diabetes = 'Y'">
												                    <xsl:attribute name="checked"></xsl:attribute>
												                </xsl:if>
												                <xsl:attribute name="disabled">disabled</xsl:attribute>
												            </xsl:element>
															<span style="font-weight:normal;">
																<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'DIABETES'"/></xsl:call-template>
															</span>
														</label>
													</div>
											</div>
												<div class="row checkbox">
													<div class="col-md-4">
														<label>
															<xsl:element name="input">
												                <xsl:attribute name="type">checkbox</xsl:attribute>
												                <xsl:if test=" schedule_a_group/gangrene = 'Y'">
												                    <xsl:attribute name="checked"></xsl:attribute>
												                </xsl:if>
												                <xsl:attribute name="disabled">disabled</xsl:attribute>
												            </xsl:element>
															<span style="font-weight:normal;">
																<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'GANGRENE'"/></xsl:call-template>
															</span>
														</label>
													</div>
													<div class="col-md-4">
														<label>
															<xsl:element name="input">
												                <xsl:attribute name="type">checkbox</xsl:attribute>
												                <xsl:if test=" schedule_a_group/glaucoma = 'Y'">
												                    <xsl:attribute name="checked"></xsl:attribute>
												                </xsl:if>
												                <xsl:attribute name="disabled">disabled</xsl:attribute>
												            </xsl:element>
															<span style="font-weight:normal;">
																<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'GLAUCOMA'"/></xsl:call-template>
															</span>
														</label>
													</div>
													<div class="col-md-4">
														<label>
															<xsl:element name="input">
												                <xsl:attribute name="type">checkbox</xsl:attribute>
												                <xsl:if test=" schedule_a_group/haematologic_bleeding = 'Y'">
												                    <xsl:attribute name="checked"></xsl:attribute>
												                </xsl:if>
												                <xsl:attribute name="disabled">disabled</xsl:attribute>
												            </xsl:element>
															<span style="font-weight:normal;">
																<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'BLEEDINGDISORDERS'"/></xsl:call-template>
															</span>
														</label>
													</div>
												</div>
												<div class="row checkbox">
													<div class="col-md-4">
														<label>
															<xsl:element name="input">
												                <xsl:attribute name="type">checkbox</xsl:attribute>
												                <xsl:if test=" schedule_a_group/hepatitis = 'Y'">
												                    <xsl:attribute name="checked"></xsl:attribute>
												                </xsl:if>
												                <xsl:attribute name="disabled">disabled</xsl:attribute>
												            </xsl:element>
															<span style="font-weight:normal;">
																<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'HEPATITIS'"/></xsl:call-template>
															</span>
														</label>
													</div>
													<div class="col-md-4">
														<label>
															<xsl:element name="input">
												                <xsl:attribute name="type">checkbox</xsl:attribute>
												                <xsl:if test=" schedule_a_group/hypertension = 'Y'">
												                    <xsl:attribute name="checked"></xsl:attribute>
												                </xsl:if>
												                <xsl:attribute name="disabled">disabled</xsl:attribute>
												            </xsl:element>
															<span style="font-weight:normal;">
																<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'HYPERTENSION'"/></xsl:call-template>
															</span>
														</label>
													</div>
													<div class="col-md-4">
														<label>
															<xsl:element name="input">
												                <xsl:attribute name="type">checkbox</xsl:attribute>
												                <xsl:if test=" schedule_a_group/nausea_pregnancy = 'Y'">
												                    <xsl:attribute name="checked"></xsl:attribute>
												                </xsl:if>
												                <xsl:attribute name="disabled">disabled</xsl:attribute>
												            </xsl:element>
															<span style="font-weight:normal;">
																<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'NAUSEAPREG'"/></xsl:call-template>
															</span>
														</label>
													</div>
												</div>
												<div class="row checkbox">
													<div class="col-md-4">
														<label>
															<xsl:element name="input">
												                <xsl:attribute name="type">checkbox</xsl:attribute>
												                <xsl:if test=" schedule_a_group/obesity = 'Y'">
												                    <xsl:attribute name="checked"></xsl:attribute>
												                </xsl:if>
												                <xsl:attribute name="disabled">disabled</xsl:attribute>
												            </xsl:element>
															<span style="font-weight:normal;">
																<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'OBESITY'"/></xsl:call-template>
															</span>
														</label>
													</div>
													<div class="col-md-4">
														<label>
															<xsl:element name="input">
												                <xsl:attribute name="type">checkbox</xsl:attribute>
												                <xsl:if test=" schedule_a_group/rheumatic_fever = 'Y'">
												                    <xsl:attribute name="checked"></xsl:attribute>
												                </xsl:if>
												                <xsl:attribute name="disabled">disabled</xsl:attribute>
												            </xsl:element>
															<span style="font-weight:normal;">
																<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'RHEUMATICFEVER'"/></xsl:call-template>
															</span>
														</label>
													</div>
													<div class="col-md-4">
														<label>
															<xsl:element name="input">
												                <xsl:attribute name="type">checkbox</xsl:attribute>
												                <xsl:if test=" schedule_a_group/septicemia = 'Y'">
												                    <xsl:attribute name="checked"></xsl:attribute>
												                </xsl:if>
												                <xsl:attribute name="disabled">disabled</xsl:attribute>
												            </xsl:element>
															<span style="font-weight:normal;">
																<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'SEPTICEMIA'"/></xsl:call-template>
															</span>
														</label>
													</div>
												</div>
												<div class="row checkbox">
													<div class="col-md-4">
														<label>
															<xsl:element name="input">
												                <xsl:attribute name="type">checkbox</xsl:attribute>
												                <xsl:if test=" schedule_a_group/sex_transmit_disease = 'Y'">
												                    <xsl:attribute name="checked"></xsl:attribute>
												                </xsl:if>
												                <xsl:attribute name="disabled">disabled</xsl:attribute>
												            </xsl:element>
															<span style="font-weight:normal;">
																<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'SEXDISEASE'"/></xsl:call-template>
															</span>
														</label>
													</div>
													<div class="col-md-4">
														<label>
															<xsl:element name="input">
												                <xsl:attribute name="type">checkbox</xsl:attribute>
												                <xsl:if test=" schedule_a_group/strangulated_hernia = 'Y'">
												                    <xsl:attribute name="checked"></xsl:attribute>
												                </xsl:if>
												                <xsl:attribute name="disabled">disabled</xsl:attribute>
												            </xsl:element>
															<span style="font-weight:normal;">
																<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'STRANGHERNIA'"/></xsl:call-template>
															</span>
														</label>
													</div>
													<div class="col-md-4">
														<label>
															<xsl:element name="input">
												                <xsl:attribute name="type">checkbox</xsl:attribute>
												                <xsl:if test=" schedule_a_group/thrombotic_embolic_disorder = 'Y'">
												                    <xsl:attribute name="checked"></xsl:attribute>
												                </xsl:if>
												                <xsl:attribute name="disabled">disabled</xsl:attribute>
												            </xsl:element>
															<span style="font-weight:normal;">
																<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'THROMBOTICDISORDER'"/></xsl:call-template>
															</span>
														</label>
													</div>
												</div>
												<div class="row checkbox">
													<div class="col-md-4">
														<label>
															<xsl:element name="input">
												                <xsl:attribute name="type">checkbox</xsl:attribute>
												                <xsl:if test=" schedule_a_group/thyroid_disease = 'Y'">
												                    <xsl:attribute name="checked"></xsl:attribute>
												                </xsl:if>
												                <xsl:attribute name="disabled">disabled</xsl:attribute>
												            </xsl:element>
															<span style="font-weight:normal;">
																<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'THYROIDDISEASE'"/></xsl:call-template>
															</span>
														</label>
													</div>
													<div class="col-md-4">
														<label>
															<xsl:element name="input">
												                <xsl:attribute name="type">checkbox</xsl:attribute>
												                <xsl:if test=" schedule_a_group/ulcer_gastro = 'Y'">
												                    <xsl:attribute name="checked"></xsl:attribute>
												                </xsl:if>
												                <xsl:attribute name="disabled">disabled</xsl:attribute>
												            </xsl:element>
															<span style="font-weight:normal;">
																<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'UCLERGASTRO'"/></xsl:call-template>
															</span>
														</label>
													</div>
												</div>
											</div>
											<div class="col-xs-12 form-group" style="padding-left: 15px;">
												<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'SCHEDA_CLAIMS'"/></xsl:call-template></label>
												<div class="row">
													<div class="col-xs-12">
														<span><xsl:value-of select="schedule_a_group/sched_a_claims_ind_details"/></span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								</xsl:if>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-12 form-group">
								<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'PROP_INDICATION'"/></xsl:call-template></label>
								<div class="col-xs-12">
									<span><xsl:value-of select="proposed_indication"/></span>
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-xs-12 form-group">
								<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'FORMULATION'"/></xsl:call-template></label>
								<div class="form-group">
									<ul class="nav nav-tabs">
										<li onclick="selectedTab(0);" tabindex="0" class="active" id="tab0"><a href="#tabpanel0"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'FORMULATIONS'"/></xsl:call-template></a>
										</li>
										<li onclick="selectedTab(1);" tabindex="0" id="tab1"><a href="#tabpanel1"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'APPENDIX4'"/></xsl:call-template></a>
										</li>
									</ul>
									<div class="tabpanels">
										<div class="active" id="tabpanel0">
											<table class="table dataTable table-bordered table-hover table-condensed table-striped">
												<tr>
													<th style="width:2%"></th>
													<th><label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'FORM_ID'"/></xsl:call-template></label></th>
													<th><label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'FORMULATION_NAME'"/></xsl:call-template></label></th>
												</tr>
											<tbody>
												<xsl:for-each select="formulation_group/formulation_details">
													<tr onclick="showDetail(this);">
														<td class="fa fa-caret-right fa-lg fa-fw"></td>
														<td><xsl:value-of select="formulation_id"/></td>
														<td><xsl:value-of select="formulation_name"/></td>
													</tr>
													<tr class="out">
														<td colspan="3"> 
															<fieldset>
																<legend><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'FORMULATION_DETAILS'"/></xsl:call-template>&#160;<xsl:value-of select="formulation_id"/></legend>
																<div class="row">
																	<div class="form-group col-md-12">
																	<label>A. <xsl:call-template name="hp-label"><xsl:with-param name="code" select="'FORMULATION_NAME'"/></xsl:call-template>:&#160;<span style="font-weight: normal;"><xsl:value-of select="formulation_name"/></span></label>
																	</div>
																</div>
																<div class="row">
																	<div class="form-group col-md-12">
																	<label>B. <xsl:call-template name="hp-label"><xsl:with-param name="code" select="'DOSAGE_FORM'"/></xsl:call-template>:&#160;<span style="font-weight: normal;"><xsl:choose><xsl:when test="$language = 'eng'"><xsl:value-of select="dosage_form_group/dosage_form/@label_en"/></xsl:when><xsl:otherwise><xsl:value-of select="dosage_form_group/dosage_form/@label_fr"/></xsl:otherwise></xsl:choose></span>&#160;<span><xsl:value-of select="dosage_form_group/dosage_form_other"/></span></label>
																	</div>
																</div>
																<div>
																	<section class="panel panel-default">
																		<header class="panel-heading"><h3 class="panel-title ng-binding">C.&#160;<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'INGREDIENTS'"/></xsl:call-template></h3></header>
																		<div class="panel-body">
																			<div>
																				<table class="table dataTable table-bordered table-hover table-condensed table-striped" id="expand-table-141">
																				<thead>
																					<tr>
																						<th style="width:2%"></th>
																						<th><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ONE_ROLE'"/></xsl:call-template></th>
																						<th><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'INGREDIENT'"/></xsl:call-template></th>
																						<th><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'IN_LIST'"/></xsl:call-template></th>
																						<th><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'CAS_NUM'"/></xsl:call-template></th>
																						<th><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ANIMAL_HUMAN_SOURCED'"/></xsl:call-template></th>
																					</tr>
																				</thead>
																				<tbody>
																					<xsl:for-each select="formulation_ingredient">
																						<tr onclick="showDetail(this);">
																							<td class="fa fa-caret-right fa-lg fa-fw"></td>
																							<td>
																								<xsl:choose>
																								<xsl:when test="ingredient_role = 'MED'">
																									<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ONE_ROLE_MED'"/></xsl:call-template>
																								</xsl:when>
																								<xsl:otherwise>
																									<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ONE_ROLE_NON_MED'"/></xsl:call-template>
																								</xsl:otherwise>
																								</xsl:choose>
																							</td>
																							<td><xsl:value-of select="ingredient_name"/></td>
																							<td><xsl:choose><xsl:when test="ingredient_id"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'Yes'"/></xsl:call-template></xsl:when><xsl:otherwise><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'No'"/></xsl:call-template></xsl:otherwise></xsl:choose></td>
																							<td><xsl:value-of select="cas_number"/></td>
																							<td><xsl:call-template name="YesNoUnknow"><xsl:with-param name="value" select="is_human_animal_src"/></xsl:call-template></td>
																						</tr>
																						<tr class="out">
																							<td colspan="6">
															<fieldset>
																<legend><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'INGRED_DETAILS'"/></xsl:call-template></legend>
																<div class="row">
																	<div class="col-md-6">
																	<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ONE_ROLE'"/></xsl:call-template>:&#160;
																	<span style="font-weight: normal;">
																	<xsl:choose>
																	<xsl:when test="ingredient_role = 'MED'">
																		<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ONE_ROLE_MED'"/></xsl:call-template>
																	</xsl:when>
																	<xsl:otherwise>
																		<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ONE_ROLE_NON_MED'"/></xsl:call-template>
																	</xsl:otherwise>
																	</xsl:choose>
																	</span></label>
																	</div>
																	<div class="col-md-6">
																	<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ING_NAME'"/></xsl:call-template>:&#160;<span style="font-weight: normal;"><xsl:value-of select="ingredient_name"/></span></label>
																	</div>
																</div>
																<div class="row">
																	<div class="col-md-6"><label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'CAS_NUM'"/></xsl:call-template>:&#160;<span style="font-weight: normal;"><xsl:value-of select="cas_number"/></span></label></div>
																	<div class="col-md-6"><label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'STANDARD'"/></xsl:call-template>:&#160;<span style="font-weight: normal;"><xsl:value-of select="ingred_standard"/></span></label></div>
																</div>
																<div class="row">
																	<div class="col-md-6"><label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'STRENGTH'"/></xsl:call-template>:&#160;
																	<span style="font-weight: normal;"><xsl:choose><xsl:when test="$language = 'eng'"><xsl:value-of select="./strength/operator/@label_en"/></xsl:when><xsl:otherwise><xsl:value-of select="./strength/operator/@label_en"/></xsl:otherwise></xsl:choose></span>&#160;
																	<xsl:if test="strength/operator = 'RA'">
																		<span style="font-weight: normal;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'RANGE_LOWER_LIMIT'"/></xsl:call-template></span>:&#160;
																	</xsl:if>
																	<span style="font-weight: normal;"><xsl:value-of select="strength/data1"/></span>&#160;/&#160;
																	<xsl:choose>
																	<xsl:when test="units_other != 'null' and units_other != ''">
																		<span style="font-weight: normal;"><xsl:value-of select="units_other"/></span>&#160;
																	</xsl:when>
																	<xsl:otherwise>
																		<span style="font-weight: normal;"><xsl:choose><xsl:when test="$language ='eng'"><xsl:value-of select="units/@label_en"/></xsl:when><xsl:otherwise><xsl:value-of select="units/@label_fr"/></xsl:otherwise></xsl:choose></span>
																	</xsl:otherwise>
																	</xsl:choose>
																	<xsl:if test="strength/operator = 'RA'">&#160;&#160;
																		<span style="font-weight: normal;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'RANGE_UPPER_LIMIT'"/></xsl:call-template></span>:&#160;
																		<span style="font-weight: normal;"><xsl:value-of select="strength/data2"/></span>&#160;/&#160;
																		<xsl:choose>
																		<xsl:when test="per_units_other_details != 'null' and per_units_other_details != ''">
																			<span style="font-weight: normal;"><xsl:value-of select="units_other"/></span>&#160;
																		</xsl:when>
																		<xsl:otherwise>
																			<span style="font-weight: normal;"><xsl:choose><xsl:when test="$language ='eng'"><xsl:value-of select="per_units/@label_en"/></xsl:when><xsl:otherwise><xsl:value-of select="per_units/@label_fr"/></xsl:otherwise></xsl:choose></span>
																		</xsl:otherwise>
																		</xsl:choose>
																	</xsl:if>
																	</label>
																	</div>
																		<xsl:variable name="perUnit">
																			<xsl:choose><xsl:when test="$language ='eng'"><xsl:value-of select="per/@label_en"/></xsl:when><xsl:otherwise><xsl:value-of select="per/@label_fr"/></xsl:otherwise></xsl:choose>
																		</xsl:variable>
																	<div class="col-md-3">
																		<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'PER_STRENGTH'"/></xsl:call-template></label>&#160;
																		<xsl:choose>
																		<xsl:when test="per_units_other_details != 'null' and per_units_other_details != ''">
																				<span style="font-weight: normal;"><xsl:value-of select="per_units_other_details"/></span>
																		</xsl:when>
																		<xsl:otherwise>
																				<span style="font-weight: normal;"><xsl:choose><xsl:when test="$language ='eng'"><xsl:value-of select="per_units/@label_en"/></xsl:when><xsl:otherwise><xsl:value-of select="per_units/@label_fr"/></xsl:otherwise></xsl:choose></span>
																		</xsl:otherwise>
																		</xsl:choose>
																		&#160;<span style="font-weight: normal;"><xsl:value-of select="per_value"/></span>
																	</div>
																	<div class="col-md-3"><label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ISBASE'"/></xsl:call-template>&#160;
																		<span style="font-weight: normal;"><xsl:call-template name="YesNoUnknow"><xsl:with-param name="value" select="is_base_calc"/></xsl:call-template></span>
																	</label></div>
																</div>
																<div class="row">
																	<div class="col-md-3"><label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'IS_NANO_MATERIAL'"/></xsl:call-template>&#160;
																		<span style="font-weight: normal;"><xsl:call-template name="YesNoUnknow"><xsl:with-param name="value" select="is_nanomaterial"/></xsl:call-template></span>
																	</label></div>
																	<div class="col-md-3"><label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ANIMAL_HUMAN_SOURCED'"/></xsl:call-template>&#160;
																		<span style="font-weight: normal;"><xsl:call-template name="YesNoUnknow"><xsl:with-param name="value" select="is_human_animal_src"/></xsl:call-template></span>
																	</label></div>
																	<xsl:if test="is_nanomaterial = 'Y'">
																	<div class="col-md-3"><label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'NANO_MATERIAL'"/></xsl:call-template>:&#160;
																		<span style="font-weight: normal;"><xsl:choose><xsl:when test="$language ='eng'"><xsl:value-of select="nanomaterial/@label_en"/></xsl:when><xsl:otherwise><xsl:value-of select="nanomaterial/@label_fr"/></xsl:otherwise></xsl:choose></span>
																		<xsl:if test="nanomaterial_details != 'null' and nanomaterial_details != ''">&#160;&#160;
																			<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'NANO_MATERIAL_OTHER'"/></xsl:call-template>:&#160;
																			<span style="font-weight: normal;"><xsl:value-of select="nanomaterial_details"/></span>
																		</xsl:if>

																	</label></div>
																	</xsl:if>
																</div>
															</fieldset>

																							</td>
																						</tr>
																					</xsl:for-each>
																				</tbody>
																				</table>
																			</div>
																		</div>
																	</section>
																</div>
																<div>
																	<section class="panel panel-default">
																		<header class="panel-heading"><h3 class="panel-title ng-binding">D.&#160;<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'IS_ANIMAL_HUMAN_MATERIAL'"/></xsl:call-template>&#160;<span style="font-weight: normal;"><xsl:call-template name="YesNoUnknow"><xsl:with-param name="value" select="is_animal_human_material"/></xsl:call-template></span></h3></header>
																		<div class="panel-body">
																			<xsl:if test="is_animal_human_material = 'Y'">
																			<div class="panel-heading">
																				<h3 class="panel-title"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ANIMAL_HUMAN_HDING'"/></xsl:call-template></h3>
																			</div>
																			<div>
																				<table class="table dataTable table-bordered table-hover table-condensed table-striped" id="expand-table-141">
																				<thead>
																					<tr>
																						<th style="width:2%"></th>
																						<th><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'MATERIAL_NAME'"/></xsl:call-template></th>
																						<th><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'CAS_NUM'"/></xsl:call-template></th>
																						<th><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'PRESENT_IN_FINAL'"/></xsl:call-template></th>
																					</tr>
																				</thead>
																				<tbody>
																					<xsl:for-each select="material_ingredient">
																						<tr onclick="showDetail(this);">
																							<td class="fa fa-caret-right fa-lg fa-fw"></td>
																							<td><xsl:value-of select="./ingredient_name"/></td>
																							<td><xsl:value-of select="./cas_number"/></td>
																							<td><xsl:call-template name="YesNoUnknow"><xsl:with-param name="value" select="in_final_container"/></xsl:call-template></td>
																						</tr>
																						<tr class="out">
																							<td colspan="4">
															<fieldset>
																<legend><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'MATERIAL_DETAILS'"/></xsl:call-template></legend>
																<div class="row">
																	<div class="col-md-6">
																	<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'MATERIAL_NAME'"/></xsl:call-template>:&#160;<span style="font-weight: normal;"><xsl:value-of select="./ingredient_name"/></span></label>
																	</div>
																</div>
																<div class="row">
																	<div class="col-md-3">
																		<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'CAS_NUM'"/></xsl:call-template>:&#160;<span style="font-weight: normal;"><xsl:value-of select="./cas_number"/></span></label>
																	</div>
																	<div class="col-md-3">
																		<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'STANDARD'"/></xsl:call-template>:&#160;<span style="font-weight: normal;"><xsl:value-of select="./cas_number"/></span></label>
																	</div>
																	<div class="col-md-3">
																		<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'PRESENT_IN_FINAL'"/></xsl:call-template>?&#160;
																		<span style="font-weight: normal;"><xsl:call-template name="YesNoUnknow"><xsl:with-param name="value" select="in_final_container"/></xsl:call-template></span></label>
																	</div>
																</div>

															</fieldset>
																							</td>
																						</tr>
																					</xsl:for-each>
																				</tbody>
																				</table>
																			</div>
																			</xsl:if>
																		</div>
																	</section>
																</div>
																<div>
																	<section class="panel panel-default">
																		<header class="panel-heading"><h3 class="panel-title ng-binding">E.&#160;<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'CONTAINER_TYPES'"/></xsl:call-template></h3></header>
																		<div class="panel-body">
																			<div>
																				<table class="table dataTable table-bordered table-hover table-condensed table-striped" id="expand-table-141">
																				<thead>
																					<tr>
																						<th style="width:2%"></th>
																						<th><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'CONTAINER_TYPE'"/></xsl:call-template></th>
																						<th><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'PACKAGE_SIZE'"/></xsl:call-template></th>
																					</tr>
																				</thead>
																				<tbody>
																					<xsl:for-each select="container_group">
																						<tr onclick="showDetail(this);">
																							<td class="fa fa-caret-right fa-lg fa-fw"></td>
																							<td><xsl:value-of select="./container_details/container_type"/></td>
																							<td><xsl:value-of select="./container_details/package_size"/></td>
																						</tr>
																						<tr class="out">
																							<td colspan="4">
															<fieldset>
																<legend><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'CONTAINER_TYPE_DETAILS'"/></xsl:call-template></legend>
																<div class="row">
																	<div class="col-md-6">
																	<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'CONTAINER_TYPE'"/></xsl:call-template>:&#160;</label>
																	</div>
																</div>
																<div class="row">
																	<div class="col-md-6"><xsl:value-of select="./container_details/container_type"/></div>
																</div>
																<div class="row">
																	<div class="col-md-6">
																	<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'PACKAGE_SIZE'"/></xsl:call-template>:&#160;</label>
																	</div>
																</div>
																<div class="row">
																	<div class="col-md-6"><xsl:value-of select="./container_details/package_size"/></div>
																</div>
																<div class="row">
																	<div class="col-md-6">
																		<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'SHELF_LIFE'"/></xsl:call-template>:&#160;
																		<span style="font-weight: normal;"><xsl:value-of select="./container_details/shelf_life_number"/></span>&#160;
																		<span style="font-weight: normal;"><xsl:choose><xsl:when test="$language = 'fra'"><xsl:apply-templates select="./container_details/shelf_life_unit/@label_fr" /></xsl:when><xsl:otherwise><xsl:apply-templates select="./container_details/shelf_life_unit/@label_en" /></xsl:otherwise></xsl:choose></span>
																		</label>
																	</div>
																</div>
																<div class="row">
																	<div class="col-md-6">
																		<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'TEMP_RANGE'"/></xsl:call-template>:&#160;
																		<span style="font-weight: normal;"><xsl:value-of select="./container_details/temperature_min"/></span>&#160;&#160;
																		<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'TO'"/></xsl:call-template>:&#160;
																		<span style="font-weight: normal;"><xsl:value-of select="./container_details/temperature_max"/></span>&#160;
																		<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'CELSIUS'"/></xsl:call-template>
																		</label>
																	</div>
																</div>
															</fieldset>
																							</td>
																						</tr>
																					</xsl:for-each>
																				</tbody>
																				</table>
																			</div>
																		</div>
																	</section>
																</div>

																<div>
																	<section class="panel panel-default">
																		<header class="panel-heading"><h3 class="panel-title ng-binding">F.&#160;<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ROA_TITLE'"/></xsl:call-template></h3></header>
																		<div class="panel-body">
																			<div>
																				<table class="table dataTable table-bordered table-hover table-condensed table-striped" id="expand-table-141">
																				<thead>
																					<tr>
																						<th><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ROA_LBL'"/></xsl:call-template></th>
																						<th><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'OTHER_ROA_DETAILS'"/></xsl:call-template></th>
																					</tr>
																				</thead>
																				<tbody>
																					<xsl:for-each select="roa_group">
																						<tr>
																							<td><xsl:choose><xsl:when test="$language = 'fra'"><xsl:apply-templates select="./roa_details/roa/@label_fr" /></xsl:when><xsl:otherwise><xsl:apply-templates select="./roa_details/roa/@label_en" /></xsl:otherwise></xsl:choose></td>
																							<td><xsl:value-of select="./roa_details/roa_other"/></td>
																						</tr>
																					</xsl:for-each>
																				</tbody>
																				</table>
																			</div>
																		</div>
																	</section>
																</div>
																<div>
																	<section class="panel panel-default">
																		<header class="panel-heading"><h3 class="panel-title">G.&#160;<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'COUNTRIES_MANUFACT'"/></xsl:call-template></h3></header>
																		<div class="panel-body">
																			<div>
																				<table class="table dataTable table-bordered table-hover table-condensed table-striped" id="expand-table-141">
																				<thead>
																					<tr>
																						<th><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'COUNTRY_MAN'"/></xsl:call-template></th>
																					</tr>
																				</thead>
																				<tbody>
																					<xsl:for-each select="country_group">
																						<tr>
																							<td><xsl:choose><xsl:when test="$language = 'fra'"><xsl:apply-templates select="./country_manufacturer/@label_fr" /></xsl:when><xsl:otherwise><xsl:apply-templates select="./country_manufacturer/@label_en" /></xsl:otherwise></xsl:choose></td>
																						</tr>
																					</xsl:for-each>
																				</tbody>
																				</table>
																			</div>
																		</div>
																	</section>
																</div>

															</fieldset>
															</td>
													</tr>
												</xsl:for-each>
											</tbody>
											</table>
										</div>
										<div class="out" id="tabpanel1">
											<table class="table dataTable table-bordered table-hover table-condensed table-striped">
												<tr>
													<th style="width:2%"></th>
													<th><label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ING_NAME'"/></xsl:call-template></label></th>
												</tr>
											<tbody>
												<xsl:for-each select="appendix4_group">
													<tr onclick="showDetail(this)">
														<td class="fa fa-caret-right fa-lg fa-fw"></td>
														<td><xsl:value-of select="./ingredient_name"/></td>
													</tr>
													<tr class="out">
														<td colspan="2"> 
															<fieldset>
																<legend><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ING_DETAILS'"/></xsl:call-template></legend>
																<div class="row">
																	<div class="col-md-12">
																	<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'INGRED_MAT_NAME'"/></xsl:call-template>:&#160;<span style="font-weight: normal;"><xsl:value-of select="./ingredient_name"/></span></label>
																	</div>
																</div>
																<div class="row">
																	<div class="col-md-12">
																		<label style="float:left"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'SOURCED'"/></xsl:call-template>:&#160;
																		<span style="font-weight:normal;">
																		<xsl:element name="input"><xsl:attribute name="type">checkbox</xsl:attribute><xsl:if test=" ./human_sourced = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if><xsl:attribute name="disabled">disabled</xsl:attribute><xsl:attribute name="style"></xsl:attribute></xsl:element>
																		&#160;<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'HUMAN'"/></xsl:call-template>
																		</span>&#160;&#160;&#160;
																		<span style="font-weight:normal;">
																			<xsl:element name="input"><xsl:attribute name="type">checkbox</xsl:attribute><xsl:if test=" ./animal_sourced = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if><xsl:attribute name="disabled">disabled</xsl:attribute><xsl:attribute name="style"></xsl:attribute></xsl:element>
																			&#160;<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ANIMAL'"/></xsl:call-template>
																		</span>
																		</label>
																	</div>
																</div>
																<xsl:if test=" ./human_sourced = 'Y' or ./animal_sourced = 'Y'">
																<div class="row">
																	<div class="panel-default" style="margin-left:10px; margin-right:10px;">
																		<header><h3 style="font-weight:300; padding-left:5px"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'TISSUES_FLUIDS_SRCS'"/></xsl:call-template></h3></header>
																		<div class="panel-body">
																			<table class="table dataTable table-bordered table-hover table-condensed table-striped">
																				<thead>
																					<tr>
																						<th><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'SYSTEM_TYPE'"/></xsl:call-template></th>
																						<th><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'SYSTEM_DETAILS'"/></xsl:call-template></th>
																						<th><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'SYSTEM_OTHER'"/></xsl:call-template></th>
																					</tr>
																				</thead>
																				<tbody>
																					<xsl:for-each select="tissues_fluids_section/*[1]">
																						<xsl:variable name="tissueName" select="name(.)"/>
																						<xsl:variable name="TISSUE_NAME"><xsl:call-template name="upperCase"><xsl:with-param name="string" select="$tissueName"/></xsl:call-template></xsl:variable>
																						<tr>
																							<td><xsl:call-template name="hp-label"><xsl:with-param name="code" select="$TISSUE_NAME"/></xsl:call-template></td>
																							<td>
																								<xsl:for-each select="*">
																									<xsl:if test=" . = 'Y'">
																									<xsl:variable name="temp" select="name(.)"/>
																									<xsl:if test="$temp != 'other_nervous_details' and $temp != 'other_digestive_details' and $temp != 'other_musculo_skeletal_details' and $temp != 'other_reproductive_details' and $temp != 'other_cardio_respiratory_details' and $temp != 'other_immune_details' and $temp != 'other_skin_glandular_details' and $temp != 'other_fluids_tissues_details'">
																									<xsl:variable name="UpperTEMP"><xsl:call-template name="upperCase"><xsl:with-param name="string" select="$temp"/></xsl:call-template></xsl:variable>
																									<xsl:call-template name="hp-label"><xsl:with-param name="code" select="$UpperTEMP"/></xsl:call-template><xsl:text disable-output-escaping="yes">&lt;br/&gt;</xsl:text>
																									</xsl:if>
																									</xsl:if>
																								</xsl:for-each>
																							</td>
																							<td><xsl:value-of select="*[self::other_nervous_details or self::other_digestive_details or self::other_musculo_skeletal_details or self::other_reproductive_details or self::other_cardio_respiratory_details or self::other_immune_details or self::other_skin_glandular_details or self::other_fluids_tissues_details]"/></td>
																						</tr>
																					</xsl:for-each>
																				</tbody>
																				</table>
																		</div>
																		<xsl:if test="animal_sourced = 'Y'">
																			<header><h3 style="font-weight:300; padding-left:5px"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ANIMAL_SRCS'"/></xsl:call-template></h3></header>
																			<div class="panel-body">
																			<table class="table dataTable table-bordered table-hover table-condensed table-striped">
																			<thead>
																					<th><label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ANIMAL_TYPE'"/></xsl:call-template></label></th>
																					<th><label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ANIMAL_TYPE_LBL'"/></xsl:call-template></label></th>
																			</thead>
																			<tbody>
																				<xsl:for-each select="animal_sourced_section/animal_src_record">
																				<tr>
																					<td><xsl:value-of select="animal_type"/></td>
																					<td><xsl:value-of select="animal_detail"/></td>
																				</tr>
																				</xsl:for-each>
																			</tbody>
																			</table>
																			<div class="row"><br/>
																			  <div class="col-md-3">
																			  	<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'IS_AGE_KNOWN'"/></xsl:call-template>&#160;
																				<span style="font-weight:normal;"><xsl:call-template name="YesNoUnknow"><xsl:with-param name="value" select="animal_sourced_section/is_animal_age_known"/></xsl:call-template></span></label>
																			  </div>
																			  <div class="col-md-3">
																			  	<xsl:if test="animal_sourced_section/is_animal_age_known = 'Y'">
																			  	<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'AGEANIMALS'"/></xsl:call-template>:&#160;<span style="font-weight:normal;"><xsl:value-of select="animal_sourced_section/animal_age"/></span></label>
																				</xsl:if>
																			  </div>
																			  <div class="col-md-6">
																			  	<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'CONTROLLEDPOP'"/></xsl:call-template>:&#160;<span style="font-weight:normal;"><xsl:call-template name="YesNoUnknow"><xsl:with-param name="value" select="animal_sourced_section/is_controlled_pop"/></xsl:call-template></span></label>
																			  </div>
																			</div>
																			<div class="row"><br/>
																			  <div class="col-md-6">
																			  	<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'CELLLINE'"/></xsl:call-template>:&#160;<span style="font-weight:normal;"><xsl:call-template name="YesNoUnknow"><xsl:with-param name="value" select="animal_sourced_section/is_cell_line"/></xsl:call-template></span></label>
																			  </div>
																			  <div class="col-md-6">
																			  	<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'BIOTECHDERIVED'"/></xsl:call-template>:&#160;<span style="font-weight:normal;"><xsl:call-template name="YesNoUnknow"><xsl:with-param name="value" select="animal_sourced_section/is_biotech_derived"/></xsl:call-template></span></label>
																			  </div><br/>
																			</div>
																			<table class="table dataTable table-bordered table-hover table-condensed table-striped">
																			<thead>
																					<th><label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ANIMAL_CTRY_ORIGIN'"/></xsl:call-template></label></th>
																					<th><label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'UNKNOWN_COUNTRY_DETAILS'"/></xsl:call-template></label></th>
																			</thead>
																			<tbody>
																				<xsl:for-each select="animal_sourced_section/country_origin_list">
																				<tr>
																					<td><span><xsl:choose><xsl:when test="$language = 'eng'"><xsl:value-of select="country_origin/country_with_unknown/@label_en"/></xsl:when><xsl:otherwise><xsl:value-of select="country_origin/country_with_unknown/@label_fr"/></xsl:otherwise></xsl:choose></span></td>
																					<td><xsl:value-of select="country_origin/unknown_country_details"/></td>
																				</tr>
																				</xsl:for-each>
																			</tbody>
																			</table>
																			</div>
																		</xsl:if>

																	</div>
																</div>
																</xsl:if>
															</fieldset>
														</td>
													</tr>
												</xsl:for-each>
											</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</section>
	</xsl:template>
	<xsl:template name="hp-label">
		<xsl:param name="code" select="/.."/>
		<xsl:variable name="value" select="$labelLookup/SimpleCodeList/row[code=$code]/*[name()=$language]"/>
		<xsl:if test="$value"><xsl:value-of select="$value"/></xsl:if>
		<xsl:if test="not($value)">Error: code missing:(<xsl:value-of select="$code"/> in <xsl:value-of select="$labelFile"/>)</xsl:if>
	</xsl:template>
	<xsl:template name="upperCase">
		<xsl:param name="string" select="/.."/>
		<xsl:variable name="smallcase" select="'abcdefghijklmnopqrstuvwxyz'" />
		<xsl:variable name="uppercase" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'" />
		<xsl:value-of select="translate($string, $smallcase, $uppercase)" />
	</xsl:template>
	<xsl:template name="YesNoUnknow">
		<xsl:param name="value" select="/.."/>
		<xsl:choose>
		<xsl:when test="$value = 'Y'">
			<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'Yes'"/></xsl:call-template>
		</xsl:when>
		<xsl:when test="$value = 'N'">
			<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'No'"/></xsl:call-template>
		</xsl:when>
		<xsl:otherwise>
			<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'UNKNOWN'"/></xsl:call-template>
		</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet><!-- Stylus Studio meta-information - (c) 2004-2009. Progress Software Corporation. All rights reserved.

<metaInformation>
	<scenarios>
		<scenario default="yes" name="Scenario1" userelativepaths="no" externalpreview="yes" url="file:///e:/hcreppi-2018-07-12-0905.xml" htmlbaseurl="" outputurl="file:///c:/SPM/test/product.html" processortype="saxon8" useresolver="yes" profilemode="0"
		          profiledepth="" profilelength="" urlprofilexml="" commandline="" additionalpath="" additionalclasspath="" postprocessortype="none" postprocesscommandline="" postprocessadditionalpath="" postprocessgeneratedext="" validateoutput="no"
		          validator="internal" customvalidator="">
			<parameterValue name="labelFile" value="'C:\Users\hcuser\git\HC-IMSD\REP\xslt\hp-ip400-labels.xml'"/>
			<advancedProp name="sInitialMode" value=""/>
			<advancedProp name="schemaCache" value="||"/>
			<advancedProp name="bXsltOneIsOkay" value="true"/>
			<advancedProp name="bSchemaAware" value="true"/>
			<advancedProp name="bGenerateByteCode" value="true"/>
			<advancedProp name="bXml11" value="false"/>
			<advancedProp name="iValidation" value="0"/>
			<advancedProp name="bExtensions" value="true"/>
			<advancedProp name="iWhitespace" value="0"/>
			<advancedProp name="sInitialTemplate" value=""/>
			<advancedProp name="bTinyTree" value="true"/>
			<advancedProp name="xsltVersion" value="2.0"/>
			<advancedProp name="bWarnings" value="true"/>
			<advancedProp name="bUseDTD" value="false"/>
			<advancedProp name="iErrorHandling" value="fatal"/>
		</scenario>
	</scenarios>
	<MapperMetaTag>
		<MapperInfo srcSchemaPathIsRelative="yes" srcSchemaInterpretAsXML="no" destSchemaPath="" destSchemaRoot="" destSchemaPathIsRelative="yes" destSchemaInterpretAsXML="no"/>
		<MapperBlockPosition></MapperBlockPosition>
		<TemplateContext></TemplateContext>
		<MapperFilter side="source"></MapperFilter>
	</MapperMetaTag>
</metaInformation>
-->