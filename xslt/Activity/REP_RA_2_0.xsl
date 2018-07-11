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
				<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" type="text/css" rel="stylesheet" />
				<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" type="text/javascript" charset="utf-8"></script>
				<script type="text/javascript">
					function addSelectBox(){
						$("span").each(function(item){
							$(this).mouseenter(function(){$(this).css("border", "1px solid black")}).mouseleave(function(){$(this).css("border", "0px")});
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
				<xsl:if test="count(ACTIVITY_ENROL) &gt; 0"> <xsl:apply-templates select="ACTIVITY_ENROL"></xsl:apply-templates> </xsl:if>
			</body>
		</html>
	</xsl:template>
	
	<!-- Activity Enrolment -->
	<xsl:template match="ACTIVITY_ENROL">
		<h1><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ACTIVITY_TEMPLATE'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></h1>
		<div class="well well-sm" >
			<TABLE border="1" cellspacing="2" cellpadding="2" style="table-layout: fixed; width: 100%;word-wrap: break-word;">
				<TR>
					<TD style="text-align: center;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'APPL_STATUS'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></TD>
					<TD style="text-align: center;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ENROL_VERSION'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></TD>
					<TD style="text-align: center;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'DATE_SAVED'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></TD>
					<TD style="text-align: center;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'CONTROL_NUM'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></TD>
					<TD style="text-align: center;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'COMPANY_ID'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></TD>
					<TD style="text-align: center;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'DossierID'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></TD>
				</TR>
				<TR>
					<TD style="text-align: center;"> <xsl:apply-templates select="application_type" /> </TD>
					<TD style="text-align: center;"> <xsl:apply-templates select="enrolment_version" /> </TD>
					<TD style="text-align: center;"> <span><xsl:apply-templates select="date_saved" /></span> </TD>
					<TD style="text-align: center;"> <span><xsl:apply-templates select="dsts_control_number" /></span> </TD>
					<TD style="text-align: center;"> <span><xsl:apply-templates select="company_id" /></span> </TD>
					<TD style="text-align: center;"> <span><xsl:apply-templates select="dossier_id_prefix" /><xsl:apply-templates select="dossier_id" /></span> </TD>
				</TR>
			</TABLE>
		</div>
		<section>
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h2 class="panel-title"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ACTIVE_ENROL'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></h2>
				</div>
				
				<div class="panel-body">
					<div class="well well-sm" >
						<div class="row">
							<div class="col-md-6">
								<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ACTIVITY_LEAD'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:&#160;
								<span style="font-weight:normal;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="reg_activity_lead"/><xsl:with-param name="language" select="$language"/></xsl:call-template></span></label>
							</div>
							<div class="col-md-6">
								<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ACTIVITY_TYPE'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:&#160;
								<span style="font-weight:normal;"><xsl:choose><xsl:when test="$language ='eng'"><xsl:value-of select="reg_activity_type/@label_en"/></xsl:when><xsl:otherwise><xsl:value-of select="reg_activity_type/@label_fr"/></xsl:otherwise></xsl:choose></span></label>
							</div>
						</div>
						<div class="row">
						<xsl:choose>
						<xsl:when test="reg_activity_type = 'B02-20160301-050'">
							<div class="col-md-12">
								<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'TYPE_VNC'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:</label>
							</div>
							<xsl:for-each select="notifiable_change_types/*">
								<xsl:variable name="temp" select="name(.)"/>
								<xsl:if test=" $temp != 'other_change_details'">
								<div class="col-md-6">
									<xsl:element name="input">
						                <xsl:attribute name="type">checkbox</xsl:attribute>
						                <xsl:if test=" . = 'Y'">
						                    <xsl:attribute name="checked"></xsl:attribute>
						                </xsl:if>
						                <xsl:attribute name="disabled">disabled</xsl:attribute>
										<xsl:attribute name="style">float:left;width:25px;</xsl:attribute>
						            </xsl:element>
									<span style="font-weight:normal;">
										<xsl:call-template name="hp-label"><xsl:with-param name="code" select="$temp"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
									</span>
								</div>
								</xsl:if>
							</xsl:for-each>
							<xsl:if test="notifiable_change_types/other_change_details">
								<div class="col-md-12">
									<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'other_change_details'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:&#160;
									<span style="font-weight:normal;"><xsl:value-of select="notifiable_change_types/other_change_details"/></span></label>
								</div>
							</xsl:if>
						</xsl:when>
						<xsl:when test="reg_activity_type = 'B02-20160301-082' or reg_activity_type = 'B02-20160301-084' or reg_activity_type = 'B02-20160301-019'">
							<div class="col-md-12">
								<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'RATIONALE_SNDS'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:</label>
							</div>
							<xsl:for-each select="rationale_types/*">
								<xsl:variable name="temp" select="name(.)"/>
								<xsl:if test=" $temp != 'other_rationale_details' and $temp != 'other_rationale'">
								<div class="col-md-6">
									<xsl:element name="input">
						                <xsl:attribute name="type">checkbox</xsl:attribute>
						                <xsl:if test=" . = 'Y'">
						                    <xsl:attribute name="checked"></xsl:attribute>
						                </xsl:if>
						                <xsl:attribute name="disabled">disabled</xsl:attribute>
										<xsl:attribute name="style">float:left;width:25px;</xsl:attribute>
						            </xsl:element>
									<span style="font-weight:normal;">
										<xsl:call-template name="hp-label"><xsl:with-param name="code" select="$temp"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
									</span>
								</div>
								</xsl:if>
							</xsl:for-each>
							<xsl:if test="rationale_types/other_rationale_details">
								<div class="col-md-12">
									<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'other_rationale_details'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:&#160;
									<span style="font-weight:normal;"><xsl:value-of select="rationale_types/other_rationale_details"/></span></label>
								</div>
							</xsl:if>
						</xsl:when>
						</xsl:choose>
						</div>
						<div class="row">
							<br/>
							<div class="col-md-12">
								<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'REASON_FILE'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:&#160;</label>
							</div>
							<div class="col-md-12">
								<span style="font-weight:normal;padding-left:10px;"><xsl:value-of select="reason_filing"/></span>
							</div>
						</div>
						<div class="row">
							<br/>
							<div class="col-md-12">
								<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'IS_SOLICITED_ACT'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>&#160;
								<span style="font-weight:normal;"><xsl:call-template name="YesNoUnknow"><xsl:with-param name="value" select="is_third_party"/><xsl:with-param name="language" select="$language"/></xsl:call-template></span></label>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12">
								<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'IS_PRIORITY'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>&#160;
								<span style="font-weight:normal;"><xsl:call-template name="YesNoUnknow"><xsl:with-param name="value" select="is_priority"/><xsl:with-param name="language" select="$language"/></xsl:call-template></span></label>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12">
								<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'IS_NOC'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>&#160;
								<span style="font-weight:normal;"><xsl:call-template name="YesNoUnknow"><xsl:with-param name="value" select="is_noc"/><xsl:with-param name="language" select="$language"/></xsl:call-template></span></label>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12">
								<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'IS_ADMIN_SUBMISSION'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>&#160;
								<span style="font-weight:normal;"><xsl:call-template name="YesNoUnknow"><xsl:with-param name="value" select="is_admin_submission"/><xsl:with-param name="language" select="$language"/></xsl:call-template></span></label>
							</div>
						</div>
						<xsl:if test="is_admin_submission = 'Y'">
						<div class="row">
							<div class="col-md-12">
								<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ADMIN_SUB_TYPE'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:&#160;
								<span style="font-weight:normal;"><xsl:choose><xsl:when test="$language ='eng'"><xsl:value-of select="sub_type/@label_en"/></xsl:when><xsl:otherwise><xsl:value-of select="sub_type/@label_fr"/></xsl:otherwise></xsl:choose></span></label>
							</div>
						</div>
						</xsl:if>
						<div class="row">
							<br/>
							<div class="col-md-12">
								<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ADDRESS_NOC'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:&#160;</label>
							</div>
						</div>
						<div class="row">
							<div class="col-md-4">
								<xsl:element name="input">
					                <xsl:attribute name="type">checkbox</xsl:attribute>
					                <xsl:if test=" manufacturer = 'Y'">
					                    <xsl:attribute name="checked"></xsl:attribute>
					                </xsl:if>
					                <xsl:attribute name="disabled">disabled</xsl:attribute>
									<xsl:attribute name="style">float:left;width:25px;</xsl:attribute>
					            </xsl:element>
								<span style="font-weight:normal;">
									<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'CONTACT_MANUFACTURER'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
								</span>
							</div>
							<div class="col-md-4">
								<xsl:element name="input">
					                <xsl:attribute name="type">checkbox</xsl:attribute>
					                <xsl:if test=" mailing = 'Y'">
					                    <xsl:attribute name="checked"></xsl:attribute>
					                </xsl:if>
					                <xsl:attribute name="disabled">disabled</xsl:attribute>
									<xsl:attribute name="style">float:left;width:25px;</xsl:attribute>
					            </xsl:element>
								<span style="font-weight:normal;">
									<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'CONTACT_MAILING'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
								</span>
							</div>
							<div class="col-md-4">
								<xsl:element name="input">
					                <xsl:attribute name="type">checkbox</xsl:attribute>
					                <xsl:if test=" this_activity = 'Y'">
					                    <xsl:attribute name="checked"></xsl:attribute>
					                </xsl:if>
					                <xsl:attribute name="disabled">disabled</xsl:attribute>
									<xsl:attribute name="style">float:left;width:25px;</xsl:attribute>
					            </xsl:element>
								<span style="font-weight:normal;">
									<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'THIS_ACTIVITY'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
								</span>
							</div>
							<div class="col-md-4">
								<xsl:element name="input">
					                <xsl:attribute name="type">checkbox</xsl:attribute>
					                <xsl:if test=" importer = 'Y'">
					                    <xsl:attribute name="checked"></xsl:attribute>
					                </xsl:if>
					                <xsl:attribute name="disabled">disabled</xsl:attribute>
									<xsl:attribute name="style">float:left;width:25px;</xsl:attribute>
					            </xsl:element>
								<span style="font-weight:normal;">
									<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'IMPORTER_SEL'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
								</span>
							</div>
						</div>
						<xsl:if test="importer = 'Y'">
						<div class="row">
							<div class="col-md-4">
								<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'IMP_COMP_ID'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:&#160;
								<span style="font-weight:normal;"><xsl:value-of select="importer_id"/></span></label>
							</div>
						</div>
						</xsl:if>
					</div>
				</div>
			</div>
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h2 class="panel-title"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'REP_CONTACT_INFO'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></h2>
				</div>
				
				<div class="panel-body">
					<div class="well well-sm" >
						<table class="table dataTable table-bordered table-hover table-condensed table-striped">
							<tr>
								<th style="width:2%"></th>
								<th><label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'FIRSTNAME'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></label></th>
								<th><label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'LASTNAME'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></label></th>
								<th><label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ONE_ROLE'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></label></th>
							</tr>
						<tbody>
							<xsl:for-each select="contact_record/rep_contact_details">
								<tr onclick="showDetail(this);">
									<td class="fa fa-caret-right fa-lg fa-fw"></td>
									<td><xsl:value-of select="given_name"/></td>
									<td><xsl:value-of select="surname"/></td>
									<td><xsl:call-template name="hp-label"><xsl:with-param name="code" select="concat('ROLE_', ../rep_contact_role)"/><xsl:with-param name="language" select="$language"/></xsl:call-template></td>
								</tr>
								<tr class="out">
									<td colspan="4"> 
										<fieldset>
											<legend><xsl:call-template name="hp-label"><xsl:with-param name="code" select="concat('ROLE_', ../rep_contact_role)"/><xsl:with-param name="language" select="$language"/></xsl:call-template>&#160;<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'REP_CONTACT'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>&#160;<xsl:value-of select="formulation_id"/></legend>
											<div class="row">
												<div class="form-group col-md-4">
												<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'SALUTATION'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:&#160;<span style="font-weight: normal;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="salutation"/><xsl:with-param name="language" select="$language"/></xsl:call-template></span></label>
												</div>
												<div class="form-group col-md-4">
												<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'JOBTITLE'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:&#160;<span style="font-weight: normal;"><xsl:value-of select="job_title"/></span></label>
												</div>
												<div class="form-group col-md-4">
												<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'LANGCORRESPOND'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:&#160;<span style="font-weight: normal;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="language_correspondance"/><xsl:with-param name="language" select="$language"/></xsl:call-template></span></label>
												</div>
											</div>
											<div class="row">
												<div class="form-group col-md-4">
												<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'FIRSTNAME'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:&#160;<span style="font-weight: normal;"><xsl:value-of select="given_name"/></span></label>
												</div>
												<div class="form-group col-md-4">
												<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'INITIALS'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:&#160;<span style="font-weight: normal;"><xsl:value-of select="initials"/></span></label>
												</div>
												<div class="form-group col-md-4">
												<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'LASTNAME'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:&#160;<span style="font-weight: normal;"><xsl:value-of select="surname"/></span></label>
												</div>
											</div>
											<div class="row">
												<div class="form-group col-md-4">
												<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'PHONENUMBER'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:&#160;<span style="font-weight: normal;"><xsl:value-of select="phone_num"/></span></label>
												</div>
												<div class="form-group col-md-4">
												<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'PHONE_EXT'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:&#160;<span style="font-weight: normal;"><xsl:value-of select="phone_ext"/></span></label>
												</div>
												<div class="form-group col-md-4">
												<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'FAX_NUMBER'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:&#160;<span style="font-weight: normal;"><xsl:value-of select="fax_num"/></span></label>
												</div>
											</div>
											<div class="row">
												<div class="form-group col-md-12">
												<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'CONTACTEMAIL'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:&#160;<span style="font-weight: normal;"><xsl:value-of select="email"/></span></label>
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
	<xsl:template name="upperCase">
		<xsl:param name="string" select="/.."/>
		<xsl:variable name="smallcase" select="'abcdefghijklmnopqrstuvwxyz'" />
		<xsl:variable name="uppercase" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'" />
		<xsl:value-of select="translate($string, $smallcase, $uppercase)" />
	</xsl:template>
	<xsl:template name="YesNoUnknow">
		<xsl:param name="value" select="/.."/>
		<xsl:param name="language" select="/.."/>
		<xsl:choose>
		<xsl:when test="$value = 'Y'">
			<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'Yes'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
		</xsl:when>
		<xsl:when test="$value = 'N'">
			<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'No'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
		</xsl:when>
		<xsl:otherwise>
			<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'UNKNOWN'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
		</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet><!-- Stylus Studio meta-information - (c) 2004-2009. Progress Software Corporation. All rights reserved.

<metaInformation>
	<scenarios>
		<scenario default="yes" name="Scenario1" userelativepaths="no" externalpreview="yes" url="file:///e:/draftrepra-0-4.xml" htmlbaseurl="" outputurl="file:///c:/SPM/test/activity.html" processortype="saxon8" useresolver="yes" profilemode="0"
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