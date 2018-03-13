<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
	<xsl:param name="labelFile" select="'https://rawgit.com/HC-IMSD/REP/dan_tempDossierSumm/xslt/hp-ip400-labels.xml'"/>
	<xsl:param name="language" select="'eng'"/>
	<xsl:variable name="labelLookup" select="document($labelFile)"/>
	<xsl:template match="/">

		<html>
			<head>
				<link href="https://lam-dev.hres.ca/rep-dev/GCWeb/css/theme.min.css" type="text/css" rel="stylesheet" />
				<link href="https://lam-dev.hres.ca/rep-dev/dossier/app/styles/rep.css" type="text/css" rel="stylesheet" />
				<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" type="text/javascript" charset="utf-8"></script>
				<script type="text/javascript">
					function addSelectBox(){
						$("span").each(function(item){
							$(this).mouseenter(function(){$(this).css("border", "1px solid black")}).mouseleave(function(){$(this).css("border", "0px")});
						});
					}
				</script>
			</head>
            <body onload="addSelectBox();">
				<xsl:if test="count(TRANSACTION_ENROL) &gt; 0"> <xsl:apply-templates select="TRANSACTION_ENROL"></xsl:apply-templates> </xsl:if>
			</body>
		</html>
	</xsl:template>
	
	<!-- Transaction Enrolment -->
	<xsl:template match="TRANSACTION_ENROL">
		<h1>Regulatory Transaction Template: Regulatory Enrolment Process (REP)</h1>
					<div class="well well-sm" >
						<TABLE border="1" cellspacing="2" cellpadding="2" style="table-layout: fixed; width: 100%;word-wrap: break-word;">
							<TR>
								<TD style="text-align: center;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'COMPANY_ID'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></TD>
								<TD style="text-align: center;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'DOSSIER_NAME'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></TD>
								<TD style="text-align: center;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'DossierID'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></TD>
								<TD style="text-align: center;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'DateLastSaved'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></TD>
							</TR>
							<TR>
								<TD style="text-align: center;"> <xsl:apply-templates select="ectd/company_id" /> </TD>
								<TD style="text-align: center;"> <xsl:apply-templates select="ectd/dossier_name" /> </TD>
								<TD style="text-align: center;"> <xsl:apply-templates select="ectd/dossier_id" /> </TD>
								<TD style="text-align: center;"> <xsl:apply-templates select="date_saved" /> </TD>
							</TR>
						</TABLE>
					</div>
		<section>
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h2 class="panel-title">Transaction Information</h2>
				</div>
				<div class="panel-body">										
					<xsl:if test="is_ectd = 'Y'">
						<div class="well well-sm" >
							<div class="row">
								<header class="panel-heading" >
									<h4 class="panel-title" ><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'LIFECYCLE_TITLE'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></h4>
								</header>								
								
								<div class="panel-body" >
									<TABLE border="1" cellspacing="2" cellpadding="2" style="table-layout: fixed; width: 100%;word-wrap: break-word;">
										<TR>
											<TD style="text-align: center;" width="10%"> <label> <xsl:call-template name="hp-label"><xsl:with-param name="code" select="'SEQUENCE_NUM'"/><xsl:with-param name="language" select="$language"/></xsl:call-template> </label> </TD>
											<TD style="text-align: center;" width="10%"> <label> <xsl:call-template name="hp-label"><xsl:with-param name="code" select="'DATE_SUBMITTED'"/><xsl:with-param name="language" select="$language"/></xsl:call-template> </label> </TD>
											<TD style="text-align: center;" width="10%"> <label> <xsl:call-template name="hp-label"><xsl:with-param name="code" select="'CONTROL_NUM'"/><xsl:with-param name="language" select="$language"/></xsl:call-template> </label> </TD>
											<TD style="text-align: center;" width="30%"> <label> <xsl:call-template name="hp-label"><xsl:with-param name="code" select="'REG_ACTIVITY'"/><xsl:with-param name="language" select="$language"/></xsl:call-template> </label> </TD>
											<TD style="text-align: center;" width="40%"> <label> <xsl:call-template name="hp-label"><xsl:with-param name="code" select="'SEQUENCE_DESCRIPT'"/><xsl:with-param name="language" select="$language"/></xsl:call-template> </label> </TD>
										</TR>
										
										<xsl:for-each select="ectd/lifecycle_record">
											<TR>
											<TD style="text-align: center;"><span> <xsl:apply-templates select="sequence_number" /></span> </TD>
											<TD style="text-align: center;"><span> <xsl:apply-templates select="date_submitted" /></span> </TD>
											<TD ><span> <xsl:apply-templates select="control_number" /></span> </TD>
											<TD> <span>
												<xsl:call-template name="hp-label">
													<xsl:with-param name="code" select="sequence_activity_type"/>
													<xsl:with-param name="language" select="$language"/>
												</xsl:call-template></span>
											</TD>
											<TD><span><xsl:apply-templates select="sequence_concat" /></span> </TD>
											</TR>
										</xsl:for-each>
									</TABLE>
								</div>
							</div>
						</div>
						
					</xsl:if>

					<div class="well well-sm" >
						<div class="row">
							<div class="col-xs-12">
								<label> <xsl:call-template name="hp-label"><xsl:with-param name="code" select="'IS_SOLICITED'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>&#160; </label>
								<span class="transaction_enrol">
									<xsl:choose>
									<xsl:when test=" is_solicited = 'Y'">
										<xsl:call-template name="hp-label">
											<xsl:with-param name="code" select="'Yes'"/>
											<xsl:with-param name="language" select="$language"/>
										</xsl:call-template>
									</xsl:when>
									<xsl:otherwise>
										<xsl:call-template name="hp-label">
											<xsl:with-param name="code" select="'No'"/>
											<xsl:with-param name="language" select="$language"/>
										</xsl:call-template>
									</xsl:otherwise>
									</xsl:choose>
								</span>
							</div>
						</div>
						<div class="row">
							<xsl:if test="is_solicited = 'Y'">
								<div class="col-xs-12">
									<label> <xsl:call-template name="hp-label"><xsl:with-param name="code" select="'SOLICITED_RQ'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:&#160; </label>
									<span class="transaction_enrol"> <xsl:apply-templates select="solicited_requester" /> </span>
								</div>
							</xsl:if>
						</div>
					</div>
					
					<h4><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'PROJ_MANAGER_NAME'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>: </h4>
					
					<div class="well well-sm" >
						<div class="row">
							<div class="col-xs-12">
								<span class="transaction_enrol"> <xsl:apply-templates select="regulatory_project_manager1" /> </span>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-12">
								<span class="transaction_enrol"> <xsl:apply-templates select="regulatory_project_manager2" /> </span>
							</div>
						</div>
					</div>
					<div class="well well-sm" >
						<div class="row">
							<div class="col-xs-12">
								<label> <xsl:call-template name="hp-label"><xsl:with-param name="code" select="'IS_FEE_TRANSACTION'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>&#160; </label>
								<span class="transaction_enrol">
									<xsl:choose>
									<xsl:when test=" is_fees = 'Y'">
										<xsl:call-template name="hp-label">
											<xsl:with-param name="code" select="'Yes'"/>
											<xsl:with-param name="language" select="$language"/>
										</xsl:call-template>
									</xsl:when>
									<xsl:otherwise>
										<xsl:call-template name="hp-label">
											<xsl:with-param name="code" select="'No'"/>
											<xsl:with-param name="language" select="$language"/>
										</xsl:call-template>
									</xsl:otherwise>
									</xsl:choose>
								</span>
							</div>
						</div>
					</div>

				</div>		
			</div>
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h2 class="panel-title"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'FEE_AMOUNT'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></h2>
				</div>
				<div class="panel-body">
					<div class="well well-sm" >
						<div class="row">
							<div class="col-xs-12">
								<label> <xsl:call-template name="hp-label"><xsl:with-param name="code" select="'SUB_CLASS'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:&#160; </label>
								<span class="transaction_enrol">
								<xsl:choose>
								<xsl:when test="$language = 'fra'">
									<xsl:value-of select="fee_details/submission_class/fr"/>
								</xsl:when>
								<xsl:otherwise>
									<xsl:value-of select="fee_details/submission_class/en"/>
								</xsl:otherwise>
								</xsl:choose>
								</span>
								<label>&#160;&#160;<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'FEE_AMOUNT'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:&#160;</label>
								<span>$<xsl:value-of select="fee_details/submission_class/fee"/></span>
							</div>
							<div class="col-xs-12">
								<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'FEE_DESCRIPTION'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:&#160;</label>
								<span>
								<xsl:choose>
								<xsl:when test="$language = 'fra'">
									<xsl:value-of select="fee_details/submission_class/description_fr"/>
								</xsl:when>
								<xsl:otherwise>
									<xsl:value-of select="fee_details/submission_class/description_en"/>
								</xsl:otherwise>
								</xsl:choose>
								</span>
							</div>
						</div>
					</div>
					<div class="well well-sm" >
						<div class="row">
							<div class="col-xs-12">
								<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'DEFER_FEES'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>?&#160; </label>
								<span class="transaction_enrol">
									<xsl:choose>
									<xsl:when test=" fee_details/deferral_request = 'Y'">
										<xsl:call-template name="hp-label">
											<xsl:with-param name="code" select="'Yes'"/>
											<xsl:with-param name="language" select="$language"/>
										</xsl:call-template>
									</xsl:when>
									<xsl:otherwise>
										<xsl:call-template name="hp-label">
											<xsl:with-param name="code" select="'No'"/>
											<xsl:with-param name="language" select="$language"/>
										</xsl:call-template>
									</xsl:otherwise>
									</xsl:choose>
								</span>
							</div>
							<div class="col-xs-12">
								<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'FEE_REMISSION'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>?&#160; </label>
								<span class="transaction_enrol">
									<xsl:choose>
									<xsl:when test=" fee_details/fee_remission = 'Y'">
										<xsl:call-template name="hp-label">
											<xsl:with-param name="code" select="'Yes'"/>
											<xsl:with-param name="language" select="$language"/>
										</xsl:call-template>
									</xsl:when>
									<xsl:otherwise>
										<xsl:call-template name="hp-label">
											<xsl:with-param name="code" select="'No'"/>
											<xsl:with-param name="language" select="$language"/>
										</xsl:call-template>
									</xsl:otherwise>
									</xsl:choose>
								</span>
							</div>
							<div class="col-xs-12">
								<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'GROSS_REVENUE'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:&#160; </label>
								<span class="transaction_enrol">$<xsl:value-of select="fee_details/gross_revenue"/></span>
								<label> &#160;&#160;<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'TEN_PERCENT_REVENUE'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:&#160; </label>
								<span class="transaction_enrol">$<xsl:value-of select="fee_details/percent_gross"/></span>
							</div>
						</div>
					</div>
					<h4><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'REQUIRED_DOC'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></h4>
					<div class="well well-sm" >
						<div class="row">
							<div class="col-xs-12">
					            <xsl:element name="input">
                                    <xsl:attribute name="type">checkbox</xsl:attribute>
                                    <xsl:if test=" fee_details/required_docs/remission_certified = 'Y'">
                                        <xsl:attribute name="checked"></xsl:attribute>
                                    </xsl:if>
                                    <xsl:attribute name="disabled">disabled</xsl:attribute>
									<xsl:attribute name="style">float:left;width:25px;</xsl:attribute>
                                </xsl:element>
								<span style="display:block;float:left;width:95%;">
									<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'STATEMENT_REVENUE'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
								</span>
							</div>
							<div class="col-xs-12">
					            <xsl:element name="input">
                                    <xsl:attribute name="type">checkbox</xsl:attribute>
                                    <xsl:if test=" fee_details/required_docs/est_market_share = 'Y'">
                                        <xsl:attribute name="checked"></xsl:attribute>
                                    </xsl:if>
                                    <xsl:attribute name="disabled">disabled</xsl:attribute>
									<xsl:attribute name="style">width:25px;</xsl:attribute>
                                </xsl:element>
								<span class="transaction_enrol">
									<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'EST_MARKET_SHARE'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
								</span>
							</div>
							<div class="col-xs-12">
					            <xsl:element name="input">
                                    <xsl:attribute name="type">checkbox</xsl:attribute>
                                    <xsl:if test=" fee_details/required_docs/comparison_products = 'Y'">
                                        <xsl:attribute name="checked"></xsl:attribute>
                                    </xsl:if>
                                    <xsl:attribute name="disabled">disabled</xsl:attribute>
									<xsl:attribute name="style">width:25px;</xsl:attribute>
                                </xsl:element>
								<span class="transaction_enrol">
									<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'SIMILAR_PRODUCT'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
								</span>
							</div>
							<div class="col-xs-12">
					            <xsl:element name="input">
                                    <xsl:attribute name="type">checkbox</xsl:attribute>
                                    <xsl:if test=" fee_details/required_docs/sales_history = 'Y'">
                                        <xsl:attribute name="checked"></xsl:attribute>
                                    </xsl:if>
                                    <xsl:attribute name="disabled">disabled</xsl:attribute>
									<xsl:attribute name="style">width:25px;</xsl:attribute>
                                </xsl:element>
								<span class="transaction_enrol">
									<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'SALES_HISTORY'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
								</span>
					            &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;<xsl:element name="input">
                                    <xsl:attribute name="type">checkbox</xsl:attribute>
                                    <xsl:if test=" fee_details/required_docs/market_plan = 'Y'">
                                        <xsl:attribute name="checked"></xsl:attribute>
                                    </xsl:if>
                                    <xsl:attribute name="disabled">disabled</xsl:attribute>
                                </xsl:element>&#160;
								<span class="transaction_enrol">
									<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'MARKETING_PLAN'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
								</span>
							</div>
							<div class="col-xs-12">
					            <xsl:element name="input">
                                    <xsl:attribute name="type">checkbox</xsl:attribute>
                                    <xsl:if test=" fee_details/required_docs/avg_sale_price = 'Y'">
                                        <xsl:attribute name="checked"></xsl:attribute>
                                    </xsl:if>
                                    <xsl:attribute name="disabled">disabled</xsl:attribute>
									<xsl:attribute name="style">width:25px;</xsl:attribute>
                                </xsl:element>
								<span class="transaction_enrol">
									<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'AVG_SALES'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
								</span>
					            &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;<xsl:element name="input">
                                    <xsl:attribute name="type">checkbox</xsl:attribute>
                                    <xsl:if test=" fee_details/required_docs/other = 'Y'">
                                        <xsl:attribute name="checked"></xsl:attribute>
                                    </xsl:if>
                                    <xsl:attribute name="disabled">disabled</xsl:attribute>
                                </xsl:element>&#160;
								<span class="transaction_enrol">
									<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'OTHER'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
								</span>
							</div>
							<xsl:if test="fee_details/required_docs/other = 'Y'">
							<div class="col-xs-12">
								<label>&#160;&#160;&#160;&#160;&#160;<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'OTHER'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:&#160;</label>
								<span><xsl:value-of select="fee_details/required_docs/other_details"/></span>
							</div>
							</xsl:if>
						</div>
					</div>
					<h3><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'PAYMENT'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></h3>
					<div class="well well-sm" >
						<div class="row">
							<div class="col-xs-12">
					<h4><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'PAYMENT_METHODS'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></h4>
							</div>
							<div class="col-xs-12">
					            <label><xsl:element name="input">
                                    <xsl:attribute name="type">checkbox</xsl:attribute>
                                    <xsl:if test=" fee_details/payment_method/bill_payment = 'Y'">
                                        <xsl:attribute name="checked"></xsl:attribute>
                                    </xsl:if>
                                    <xsl:attribute name="disabled">disabled</xsl:attribute>
									<xsl:attribute name="style">float:left;width:25px;</xsl:attribute>
                                </xsl:element>
								<span style="font-weight:normal;">
									<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'PREFEERED_OPTION'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
								</span>&#160;&#160;</label>
					            <label><xsl:element name="input">
                                    <xsl:attribute name="type">checkbox</xsl:attribute>
                                    <xsl:if test=" fee_details/payment_method/existing_credit = 'Y'">
                                        <xsl:attribute name="checked"></xsl:attribute>
                                    </xsl:if>
                                    <xsl:attribute name="disabled">disabled</xsl:attribute>
									<xsl:attribute name="style">float:left;width:25px;</xsl:attribute>
                                </xsl:element>
								<span style="font-weight:normal;">
									<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'EXISTING_CREDIT'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
								</span>&#160;&#160;</label>
					            <label><xsl:element name="input">
                                    <xsl:attribute name="type">checkbox</xsl:attribute>
                                    <xsl:if test=" fee_details/payment_method/bank_wire = 'Y'">
                                        <xsl:attribute name="checked"></xsl:attribute>
                                    </xsl:if>
                                    <xsl:attribute name="disabled">disabled</xsl:attribute>
									<xsl:attribute name="style">float:left;width:25px;</xsl:attribute>
                                </xsl:element>
								<span style="font-weight:normal;">
									<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'BANK_WIRE'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
								</span></label>
							</div>
							<div class="col-xs-12">
					            <label><xsl:element name="input">
                                    <xsl:attribute name="type">checkbox</xsl:attribute>
                                    <xsl:if test=" fee_details/payment_method/credit_card = 'Y'">
                                        <xsl:attribute name="checked"></xsl:attribute>
                                    </xsl:if>
                                    <xsl:attribute name="disabled">disabled</xsl:attribute>
									<xsl:attribute name="style">float:left;width:25px;</xsl:attribute>
                                </xsl:element>
								<span style="font-weight:normal;">
									<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'CREDIT'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
								</span>&#160;&#160;</label>
					            <label><xsl:element name="input">
                                    <xsl:attribute name="type">checkbox</xsl:attribute>
                                    <xsl:if test=" fee_details/payment_method/cheque = 'Y'">
                                        <xsl:attribute name="checked"></xsl:attribute>
                                    </xsl:if>
                                    <xsl:attribute name="disabled">disabled</xsl:attribute>
									<xsl:attribute name="style">float:left;width:25px;</xsl:attribute>
                                </xsl:element>
								<span style="font-weight:normal;">
									<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'CHEQUE'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
								</span>&#160;&#160;</label>
					            <label><xsl:element name="input">
                                    <xsl:attribute name="type">checkbox</xsl:attribute>
                                    <xsl:if test=" fee_details/payment_method/money_order = 'Y'">
                                        <xsl:attribute name="checked"></xsl:attribute>
                                    </xsl:if>
                                    <xsl:attribute name="disabled">disabled</xsl:attribute>
									<xsl:attribute name="style">float:left;width:25px;</xsl:attribute>
                                </xsl:element>
								<span style="font-weight:normal;">
									<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'MONEY_ORDER'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
								</span>&#160;&#160;</label>
					            <label><xsl:element name="input">
                                    <xsl:attribute name="type">checkbox</xsl:attribute>
                                    <xsl:if test=" fee_details/payment_method/bank_draft = 'Y'">
                                        <xsl:attribute name="checked"></xsl:attribute>
                                    </xsl:if>
                                    <xsl:attribute name="disabled">disabled</xsl:attribute>
									<xsl:attribute name="style">float:left;width:25px;</xsl:attribute>
                                </xsl:element>
								<span style="font-weight:normal;">
									<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'BANK_DRAFT'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
								</span></label>
							</div>
						</div>
					</div>

				</div>
			</div>
			
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h2 class="panel-title"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'REG_ACT_CONTACT'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></h2>
				</div>
				<div class="panel-body">
					<h4><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'REG_CONTACT_THIS'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></h4>
					<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'COMPANY_INFO'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>: </label>
					<div class="well well-sm" >
						<div class="row">
							<div class="col-xs-12">
								<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'COMPANY_NOABBREV'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></label>
							</div>
							<div class="col-xs-12">
								<span class="transaction_enrol"><xsl:apply-templates select="company_name" /> </span>
							</div>
						</div>
					</div>
					<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ADDRESS_INFO'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>: </label>
					<div class="well well-sm" >
						<div class="row">
							<div class="col-xs-12">
								<label class="col-xs-2"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'STREET_SUITE'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></label>
								<span class="transaction_enrol"> <xsl:apply-templates select="regulatory_activity_address/street_address" /> </span>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-12">
								<label class="col-xs-2"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'CITY_TOWN'"/><xsl:with-param name="language" select="$language"/></xsl:call-template> </label>
								<span class="transaction_enrol"> <xsl:apply-templates select="regulatory_activity_address/city" /> </span>
								<label> &#160;&#160;<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'PROVINCE'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>&#160;&#160; </label>
								<span class="transaction_enrol"> <xsl:choose><xsl:when test="(regulatory_activity_address/country = 'CAN') or (regulatory_activity_address/country = 'USA')"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="regulatory_activity_address/province_lov" /><xsl:with-param name="language" select="$language"/></xsl:call-template></xsl:when><xsl:otherwise><xsl:apply-templates select="regulatory_activity_address/province_text" /></xsl:otherwise></xsl:choose> </span>
								<label> &#160;&#160;<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'COUNTRY'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>&#160;&#160; </label>
								<span class="transaction_enrol"> 
								<xsl:choose>
								<xsl:when test="$language = 'fra'">
									<xsl:value-of select="regulatory_activity_address/country/@label_fr"/>
								</xsl:when>
								<xsl:otherwise>
									<xsl:value-of select="regulatory_activity_address/country/@label_en"/>
								</xsl:otherwise>
								</xsl:choose>
								</span>
							</div>
							<div class="col-xs-12">
								<label class="col-xs-2"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'POSTAL_ZIP'"/><xsl:with-param name="language" select="$language"/></xsl:call-template> </label>
								<span class="transaction_enrol"> <xsl:apply-templates select="regulatory_activity_address/postal_code" /> </span>
							</div>
						</div>
					</div>
					<h4><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'COMPANY_REP_THIS'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>: </h4>
					<div class="well well-sm" >
						<div class="row">
							<div class="col-xs-12">
								<label class="col-xs-2"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'MONEY_ORDER'"/><xsl:with-param name="language" select="$language"/></xsl:call-template> </label>
								<span class="transaction_enrol"> <xsl:call-template name="hp-label"><xsl:with-param name="code" select="regulatory_activity_contact/salutation" /><xsl:with-param name="language" select="$language"/></xsl:call-template> </span>
								<label> &#160;&#160;<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'JOBTITLE'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>&#160;&#160; </label>
								<span class="transaction_enrol"> <xsl:apply-templates select="regulatory_activity_contact/job_title" /> </span>
								<label> &#160;&#160;<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'LANGCORRESPOND'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>&#160;&#160; </label>
								<span class="transaction_enrol"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="regulatory_activity_contact/language_correspondance"/><xsl:with-param name="language" select="$language"/></xsl:call-template></span>
							</div>
							<div class="col-xs-12">
								<label class="col-xs-2"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'FIRSTNAME'"/><xsl:with-param name="language" select="$language"/></xsl:call-template> </label>
								<span class="transaction_enrol"> <xsl:apply-templates select="regulatory_activity_contact/given_name" /> </span>
								<label> &#160;&#160;<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'INITIALS'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>&#160;&#160; </label>
								<span class="transaction_enrol"> <xsl:apply-templates select="regulatory_activity_contact/initials" /> </span>
								<label> &#160;&#160;<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'LASTNAME'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>&#160;&#160; </label>
								<span class="transaction_enrol"> <xsl:apply-templates select="regulatory_activity_contact/surname" /> </span>
							</div>
							<div class="col-xs-12">
							</div>
							<div class="col-xs-12">
							</div>
						</div>
						<div class="row">
							<div class="col-xs-12">
								<label class="col-xs-2"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'PHONENUMBER'"/><xsl:with-param name="language" select="$language"/></xsl:call-template> </label>
								<span class="transaction_enrol"> <xsl:apply-templates select="regulatory_activity_contact/phone_num" /> </span>
								<label>&#160;<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'EXTENSION'"/><xsl:with-param name="language" select="$language"/></xsl:call-template> &#160;</label>
								<span class="transaction_enrol"> <xsl:apply-templates select="regulatory_activity_contact/phone_ext" /> </span>
							</div>
							<div class="col-xs-12">
								<label class="col-xs-2"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'FAX_NUMBER'"/><xsl:with-param name="language" select="$language"/></xsl:call-template> </label>
								<span class="transaction_enrol"> <xsl:apply-templates select="regulatory_activity_contact/fax_num" /> </span>
							</div>
							<div class="col-xs-12">
								<label class="col-xs-2"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'CONTACTEMAIL'"/><xsl:with-param name="language" select="$language"/></xsl:call-template> </label>
								<span class="transaction_enrol"> <xsl:apply-templates select="regulatory_activity_contact/email" /> </span>
							</div>
						</div>
					</div>
					<div class="well well-sm" >
						<div class="row">
							<div class="col-xs-12">
								<label><xsl:element name="input">
                                    <xsl:attribute name="type">checkbox</xsl:attribute>
                                    <xsl:if test=" confirm_regulatory_contact = 'Y'">
                                        <xsl:attribute name="checked"></xsl:attribute>
                                    </xsl:if>
                                    <xsl:attribute name="disabled">disabled</xsl:attribute>
									<xsl:attribute name="style">float:left;width:25px;</xsl:attribute>
                                </xsl:element>
								<span>
									<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'CONFIRM_REGULATORY'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
								</span></label>
							</div>
						</div>
					</div>
					
				</div>		
			</div>
		</section>
	</xsl:template>
	<xsl:template name="hp-label">
		<xsl:param name="language" select="/.."/>
		<xsl:param name="code" select="/.."/>
		<xsl:variable name="value" select="$labelLookup/SimpleCodeList/row[code=$code]/*[name()=$language]"/>
		<xsl:if test="$value"><xsl:value-of select="$value"/></xsl:if>
		<xsl:if test="not($value)">Error: code missing:(<xsl:value-of select="$code"/> in <xsl:value-of select="$labelFile"/>)</xsl:if>
	</xsl:template>
</xsl:stylesheet><!-- Stylus Studio meta-information - (c) 2004-2009. Progress Software Corporation. All rights reserved.

<metaInformation>
	<scenarios>
		<scenario default="yes" name="Scenario1" userelativepaths="yes" externalpreview="yes" url="..\..\..\..\..\..\Downloads\hcreprt-2018-03-01-1501.xml" htmlbaseurl="" outputurl="..\..\..\..\..\..\..\..\SPM\test\transaction.html" processortype="saxon8"
		          useresolver="yes" profilemode="0" profiledepth="" profilelength="" urlprofilexml="" commandline="" additionalpath="" additionalclasspath="" postprocessortype="none" postprocesscommandline="" postprocessadditionalpath=""
		          postprocessgeneratedext="" validateoutput="no" validator="internal" customvalidator="">
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