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
						$(".container span").each(function(item){
							$(this).mouseenter(function(){$(this).css("border", "1px solid black")}).mouseleave(function(){$(this).css("border", "0px")});
						});
					}
				</script>
			</head>
            <body onload="addSelectBox();">
                <xsl:if test="count(DOSSIER_ENROL) &gt; 0"> <xsl:apply-templates select="DOSSIER_ENROL"></xsl:apply-templates> </xsl:if>
            </body>
        </html>
    </xsl:template>
	
    <!-- Dossier Enrolment -->
    <xsl:template match="DOSSIER_ENROL">
		<div class="container">
        <h1><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'DOSSIER_TEMP'"/></xsl:call-template></h1>
		<div class="well well-sm" >
			<TABLE border="1" cellspacing="2" cellpadding="2" style="table-layout: fixed; width: 100%;word-wrap: break-word;">
				<TR>
					<TD style="text-align: center;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'EnrolStatus'"/></xsl:call-template></TD>
					<TD style="text-align: center;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ENROL_VERSION'"/></xsl:call-template></TD>
					<TD style="text-align: center;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'DATE_SAVED'"/></xsl:call-template></TD>
					<TD style="text-align: center;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'DossierID'"/></xsl:call-template></TD>
				</TR>
				<TR>
					<TD style="text-align: center;"> <xsl:apply-templates select="application_type" /> </TD>
					<TD style="text-align: center;"> <xsl:apply-templates select="enrolment_version" /> </TD>
					<TD style="text-align: center;"> <xsl:apply-templates select="date_saved" /> </TD>
					<TD style="text-align: center;"> <xsl:apply-templates select="dossier_id" /> </TD>
				</TR>
			</TABLE>
		</div>
        <section class="panel panel-primary mrgn-tp-lg">
            <header class="panel-heading clearfix">
               <h2 class="panel-title"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'DossierInfo'"/></xsl:call-template></h2>
			</header>
            <div class="panel-body">

				<div class="well well-sm" >
                    <div class="row">
						<div class="col-xs-4">
							<label class="required"><xsl:call-template name="hp-label">
								<xsl:with-param name="code" select="'A_DossierType'"/>
							</xsl:call-template>:&#160;</label>
							<span style="padding-left:3px;white-space:nowrap;"><xsl:value-of select="dossier_type"/></span>
						</div>
						<div class="col-xs-4">
							<label class="required"><xsl:call-template name="hp-label">
								<xsl:with-param name="code" select="'B_CompanyID'"/>
							</xsl:call-template>:</label>
							<span style="padding-left:3px;white-space:nowrap;"><xsl:value-of select="company_id"/></span>
						</div>
                    </div>
                    <div class="row">
						<div class="col-xs-12">
							<label class="required"><xsl:call-template name="hp-label">
								<xsl:with-param name="code" select="'C_SubmissionSignThird'"/>
							</xsl:call-template>:&#160;</label>
							<span style="padding-left:3px;white-space:nowrap;">
							<xsl:choose>
							<xsl:when test=" third_party_signed = 'Y'">
								<xsl:call-template name="hp-label">
									<xsl:with-param name="code" select="'Yes'"/>
								</xsl:call-template>
							</xsl:when>
							<xsl:otherwise>
								<xsl:call-template name="hp-label">
									<xsl:with-param name="code" select="'No'"/>
								</xsl:call-template>
							</xsl:otherwise>
							</xsl:choose>
							</span>
						</div>
					</div>
                    <div class="row">
						<div class="col-xs-12">
							<label class="required"><xsl:call-template name="hp-label">
									<xsl:with-param name="code" select="'D_ProductName'"/>
								</xsl:call-template>:&#160;</label>
							<span style="padding-left:3px;white-space:nowrap;"><xsl:value-of select="product_name"/></span>
						</div>
					</div>
                    <div class="row">
						<div class="col-xs-12">
							<label class="required"><xsl:call-template name="hp-label">
									<xsl:with-param name="code" select="'E_ProperCommonNonProrietaryName'"/>
								</xsl:call-template>:&#160;</label>
							<span style="padding-left:3px;white-space:nowrap;"><xsl:value-of select="common_name"/></span>
						</div>
					</div>
                    <div class="row">
						<div class="col-xs-12">
							<label class="required"><xsl:call-template name="hp-label">
									<xsl:with-param name="code" select="'F_DrugUse'"/>
								</xsl:call-template>:&#160;</label>
							<span style="padding-left:3px;white-space:nowrap;">
								<xsl:call-template name="hp-label">
									<xsl:with-param name="code" select="drug_use"/>
								</xsl:call-template>
							</span>
						</div>
					</div>
                    <div class="row">
						<div class="col-xs-12">
							<label class="required"><xsl:call-template name="hp-label">
									<xsl:with-param name="code" select="'G_RelatedInfo'"/>
								</xsl:call-template>:&#160;</label>
							<span style="padding-left:3px;white-space:nowrap;"><xsl:value-of select="related_information"/></span>
						</div>
					</div>
                    <div class="row">
						<div class="col-xs-12">
							<label class="required"><xsl:call-template name="hp-label">
									<xsl:with-param name="code" select="'H_Therapeutic'"/>
								</xsl:call-template>:&#160;</label>
							<div style="padding-left:3px;white-space:nowrap;">
								<table border="1" cellspacing="2" cellpadding="2" style="table-layout: fixed; width: 100%;word-wrap: break-word;">
								<thead>
								<tr><th>
									<label class="required"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'THERAPEUTIC_CLASSIFICATION_NAME'"/></xsl:call-template></label>
								</th></tr>
								</thead>
								<tbody>
				                        <xsl:for-each select="therapeutic_class_list/therapeutic_class">
											<tr>
												<xsl:if test="position() mod 2 = 0">
													<xsl:attribute name="style">background-color:#b0bed9;</xsl:attribute>
												</xsl:if>
												<td><span><xsl:value-of select="."/></span></td>
											</tr>
										</xsl:for-each>
								</tbody>
								</table>
							</div>
						</div>
					</div>
                    <div class="row">
						<div class="col-xs-12">
							<label class="required"><xsl:call-template name="hp-label">
									<xsl:with-param name="code" select="'I_IsCaRefProduct'"/>
								</xsl:call-template></label>
							<span style="padding-left:3px;white-space:nowrap;">
							<xsl:choose>
							<xsl:when test=" is_ref_product = 'Y'">
								<xsl:call-template name="hp-label">
									<xsl:with-param name="code" select="'Yes'"/>
								</xsl:call-template>
							</xsl:when>
							<xsl:otherwise>
								<xsl:call-template name="hp-label">
									<xsl:with-param name="code" select="'No'"/>
								</xsl:call-template>
							</xsl:otherwise>
							</xsl:choose>
							</span>
						</div>
					</div>
					<xsl:if test=" is_ref_product = 'Y'">
                    <div class="row">
						<div class="col-xs-12">
							<ul style="list-style:none;">
							<li>
							<label class="required"><xsl:call-template name="hp-label">
									<xsl:with-param name="code" select="'CaRefProduct'"/>
								</xsl:call-template></label>
							</li>
							<li>
								<ul style="list-style: none;">
									<li>
									<label class="required"><xsl:call-template name="hp-label">
									<xsl:with-param name="code" select="'I_BrandName'"/>
								</xsl:call-template>:&#160;</label>
									<span style="padding-left:3px;white-space:nowrap;"><xsl:value-of select="cdn_ref_product/brand_name"/></span>
									</li>
									<li>
									<label class="required"><xsl:call-template name="hp-label">
									<xsl:with-param name="code" select="'I_CompanyName'"/>
								</xsl:call-template>:&#160;</label>
									<span style="padding-left:3px;white-space:nowrap;"><xsl:value-of select="cdn_ref_product/company_name"/></span>
									</li>
								</ul>
							</li>
							</ul>
						</div>
					</div>

					</xsl:if>
				</div>
            </div>
        </section>
        <section class="panel panel-primary mrgn-tp-lg">
            <header class="panel-heading clearfix">
               <h2 class="panel-title"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'REP_CONTACT_INFO'"/></xsl:call-template></h2>
			</header>
            <div class="panel-body">
				<div class="well well-sm" >
						<table border="1" cellspacing="2" cellpadding="2" style="table-layout: fixed; width: 100%;word-wrap: break-word;">
						<tbody>
							<xsl:for-each select="contact_record">
								<tr>
									<xsl:choose>
									<xsl:when test="position() mod 2 = 1">
										<td colspan="6" style="background-color:grey;color:white;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ROLE_PRIMARY'"/></xsl:call-template></td>
									</xsl:when>
									<xsl:otherwise>
										<td colspan="6" style="background-color:grey;color:white;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ROLE_SECONDARY'"/></xsl:call-template></td>
									</xsl:otherwise>
									</xsl:choose>
								</tr>
								<tr>
									<xsl:if test="position() mod 2 = 0">
										<xsl:attribute name="style">background-color:#b0bed9;</xsl:attribute>
									</xsl:if>
									<td style="padding-left:2px; font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'SALUTATION'"/></xsl:call-template></td>
									<td style="padding-left:2px;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="./rep_contact_details/salutation"/></xsl:call-template></td>
									<td style="padding-left:2px; font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'JOBTITLE'"/></xsl:call-template></td>
									<td style="padding-left:2px;"><xsl:value-of select="rep_contact_details/job_title"/></td>
									<td style="padding-left:2px; font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'LANGCORRESPOND'"/></xsl:call-template></td>
									<td style="padding-left:2px;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="rep_contact_details/language_correspondance"/></xsl:call-template></td>
								</tr>
								<tr>
									<xsl:if test="position() mod 2 = 0">
										<xsl:attribute name="style">background-color:#b0bed9;</xsl:attribute>
									</xsl:if>
									<td style="padding-left:2px; font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'FIRSTNAME'"/></xsl:call-template></td>
									<td style="padding-left:2px;"><xsl:value-of select="rep_contact_details/given_name"/></td>
									<td style="padding-left:2px; font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'INITIALS'"/></xsl:call-template></td>
									<td style="padding-left:2px;"><xsl:value-of select="rep_contact_details/initials"/></td>
									<td style="padding-left:2px; font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'LASTNAME'"/></xsl:call-template></td>
									<td style="padding-left:2px;"><xsl:value-of select="rep_contact_details/surname"/></td>
								</tr>
								<tr>
									<xsl:if test="position() mod 2 = 0">
										<xsl:attribute name="style">background-color:#b0bed9;</xsl:attribute>
									</xsl:if>
									<td style="padding-left:2px; font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ONE_ROLE'"/></xsl:call-template></td>
									<td style="padding-left:2px;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="concat('ROLE_', rep_contact_role)"/></xsl:call-template></td>
									<td style="padding-left:2px; font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'EMAIL'"/></xsl:call-template></td>
									<td colspan="3" style="padding-left:2px;"><xsl:value-of select="rep_contact_details/email"/></td>
								</tr>
							</xsl:for-each>
						</tbody>
						</table>
				</div>
			</div>
		</section>
		</div>
    </xsl:template>
	<xsl:template name="hp-label">
		<xsl:param name="code" select="/.."/>
		<xsl:variable name="value" select="$labelLookup/SimpleCodeList/row[code=$code]/*[name()=$language]"/>
		<xsl:if test="$value"><xsl:value-of select="$value"/></xsl:if>
		<xsl:if test="not($value)">Error: code missing:(<xsl:value-of select="$code"/> in <xsl:value-of select="$labelFile"/>)</xsl:if>
	</xsl:template>
</xsl:stylesheet><!-- Stylus Studio meta-information - (c) 2004-2009. Progress Software Corporation. All rights reserved.

<metaInformation>
	<scenarios>
		<scenario default="yes" name="Scenario1" userelativepaths="yes" externalpreview="yes" url="..\..\..\..\..\..\Downloads\draftrepdo-0-5.xml" htmlbaseurl="" outputurl="..\..\..\..\..\..\..\..\SPM\test\dossier.html" processortype="saxon8"
		          useresolver="yes" profilemode="0" profiledepth="" profilelength="" urlprofilexml="" commandline="" additionalpath="" additionalclasspath="" postprocessortype="none" postprocesscommandline="" postprocessadditionalpath=""
		          postprocessgeneratedext="" validateoutput="no" validator="internal" customvalidator="">
			<parameterValue name="labelFile" value="'C:\Users\hcuser\git\HC-IMSD\REP\xslt\hp-ip400-labels.xml'"/>
			<parameterValue name="language" value="'eng'"/>
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