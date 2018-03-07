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
        <h1><xsl:call-template name="hp-label">
								<xsl:with-param name="code" select="'RegEnrolProcess'"/>
								<xsl:with-param name="language" select="$language"/>
							</xsl:call-template></h1>
        <section class="panel panel-primary mrgn-tp-lg">
            <header class="panel-heading clearfix">
                    <h2 class="panel-title"><xsl:call-template name="hp-label">
								<xsl:with-param name="code" select="'DossierInfo'"/>
								<xsl:with-param name="language" select="$language"/>
							</xsl:call-template></h2>
			</header>
                <div class="panel-body">
					<div class="row">
						<div class="col-xs-3 form-group">
							<label><xsl:call-template name="hp-label">
								<xsl:with-param name="code" select="'EnrolStatus'"/>
								<xsl:with-param name="language" select="$language"/>
							</xsl:call-template>:&#160;</label>
							<span style="padding-left:3px;white-space:nowrap;"><xsl:value-of select="application_type"/></span>
						</div>
						<div class="col-xs-3 form-group">
							<label><xsl:call-template name="hp-label">
								<xsl:with-param name="code" select="'EnrolVersion'"/>
								<xsl:with-param name="language" select="$language"/>
							</xsl:call-template>:&#160;</label>
							<span style="padding-left:3px;white-space:nowrap;"><xsl:value-of select="enrolment_version"/></span>
						</div>
						<div class="col-xs-3 form-group">
							<label><xsl:call-template name="hp-label">
								<xsl:with-param name="code" select="'DateLastSaved'"/>
								<xsl:with-param name="language" select="$language"/>
							</xsl:call-template>:&#160;</label>
							<span style="padding-left:3px;white-space:nowrap;"><xsl:value-of select="date_saved"/></span>
						</div>
						<div class="col-xs-3 form-group">
							<xsl:choose>
							<xsl:when test="dossier_id != ''">
								<label class="required"><xsl:call-template name="hp-label">
								<xsl:with-param name="code" select="'DossierID'"/>
								<xsl:with-param name="language" select="$language"/>
							</xsl:call-template>:&#160;</label>
								<span style="padding-left:3px;white-space:nowrap;">HC6-024-<xsl:value-of select="dossier_id"/></span>
							</xsl:when>
							<xsl:otherwise>
								<label><xsl:call-template name="hp-label">
								<xsl:with-param name="code" select="'DossierID'"/>
								<xsl:with-param name="language" select="$language"/>
							</xsl:call-template>:&#160;</label>
								<span style="padding-left:3px;white-space:nowrap;">HC6-024</span>
							</xsl:otherwise>
							</xsl:choose>
						</div>
					</div>
                    <div class="row">
						<div class="col-xs-4">
							<label class="required"><xsl:call-template name="hp-label">
								<xsl:with-param name="code" select="'A_DossierType'"/>
								<xsl:with-param name="language" select="$language"/>
							</xsl:call-template>:&#160;</label>
							<span style="padding-left:3px;white-space:nowrap;"><xsl:value-of select="dossier_type"/></span>
						</div>
						<div class="col-xs-4">
							<label class="required"><xsl:call-template name="hp-label">
								<xsl:with-param name="code" select="'B_CompanyID'"/>
								<xsl:with-param name="language" select="$language"/>
							</xsl:call-template>:</label>
							<span style="padding-left:3px;white-space:nowrap;"><xsl:value-of select="company_id"/></span>
						</div>
                    </div>
                    <div class="row">
						<div class="col-xs-12">
							<label class="required"><xsl:call-template name="hp-label">
								<xsl:with-param name="code" select="'C_SubmissionSignThird'"/>
								<xsl:with-param name="language" select="$language"/>
							</xsl:call-template>:&#160;</label>
							<span style="padding-left:3px;white-space:nowrap;">
							<xsl:choose>
							<xsl:when test=" third_party_signed = 'Y'">
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
						<div class="col-xs-12">
							<label class="required"><xsl:call-template name="hp-label">
									<xsl:with-param name="code" select="'D_ProductName'"/>
									<xsl:with-param name="language" select="$language"/>
								</xsl:call-template>:&#160;</label>
							<span style="padding-left:3px;white-space:nowrap;"><xsl:value-of select="product_name"/></span>
						</div>
					</div>
                    <div class="row">
						<div class="col-xs-12">
							<label class="required"><xsl:call-template name="hp-label">
									<xsl:with-param name="code" select="'E_ProperCommonNonProrietaryName'"/>
									<xsl:with-param name="language" select="$language"/>
								</xsl:call-template>:&#160;</label>
							<span style="padding-left:3px;white-space:nowrap;"><xsl:value-of select="common_name"/></span>
						</div>
					</div>
                    <div class="row">
						<div class="col-xs-12">
							<label class="required"><xsl:call-template name="hp-label">
									<xsl:with-param name="code" select="'F_DrugUse'"/>
									<xsl:with-param name="language" select="$language"/>
								</xsl:call-template>:&#160;</label>
							<span style="padding-left:3px;white-space:nowrap;">
								<xsl:call-template name="hp-label">
									<xsl:with-param name="code" select="drug_use"/>
									<xsl:with-param name="language" select="$language"/>
								</xsl:call-template>
<!--								<xsl:choose>
								<xsl:when test="drug_use = 'HUMAN'"><xsl:call-template name="hp-label">
									<xsl:with-param name="code" select="drug_use"/>
									<xsl:with-param name="language" select="$language"/>
								</xsl:call-template>
								</xsl:when>
								<xsl:when test="drug_use = 'RADIO'"><xsl:call-template name="hp-label">
									<xsl:with-param name="code" select="'RADIO'"/>
									<xsl:with-param name="language" select="$language"/>
								</xsl:call-template>
								</xsl:when>
								<xsl:when test="drug_use = 'VET'"><xsl:call-template name="hp-label">
									<xsl:with-param name="code" select="'No'"/>
									<xsl:with-param name="language" select="$language"/>
								</xsl:call-template>Veterinary
								</xsl:when>
								<xsl:when test="drug_use = 'DISINFECT'"><xsl:call-template name="hp-label">
									<xsl:with-param name="code" select="'No'"/>
									<xsl:with-param name="language" select="$language"/>
								</xsl:call-template>Disinfectant
								</xsl:when>
								</xsl:choose>-->
							</span>
						</div>
					</div>
                    <div class="row">
						<div class="col-xs-12">
							<label class="required"><xsl:call-template name="hp-label">
									<xsl:with-param name="code" select="'G_RelatedInfo'"/>
									<xsl:with-param name="language" select="$language"/>
								</xsl:call-template>:&#160;</label>
							<span style="padding-left:3px;white-space:nowrap;"><xsl:value-of select="related_information"/></span>
						</div>
					</div>
                    <div class="row">
						<div class="col-xs-12">
							<label class="required"><xsl:call-template name="hp-label">
									<xsl:with-param name="code" select="'H_Therapeutic'"/>
									<xsl:with-param name="language" select="$language"/>
								</xsl:call-template>:&#160;</label>
							<div style="padding-left:3px;white-space:nowrap;">
								<ul style="list-style:none;">
		                        <xsl:for-each select="therapeutic_class_list/therapeutic_class">
									<li><span><xsl:value-of select="."/></span></li>
								</xsl:for-each>
								</ul>
							</div>
						</div>
					</div>
                    <div class="row">
						<div class="col-xs-12">
							<label class="required"><xsl:call-template name="hp-label">
									<xsl:with-param name="code" select="'I_IsCaRefProduct'"/>
									<xsl:with-param name="language" select="$language"/>
								</xsl:call-template>?</label>
							<span style="padding-left:3px;white-space:nowrap;">
							<xsl:choose>
							<xsl:when test=" is_ref_product = 'Y'">
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
					<xsl:if test=" is_ref_product = 'Y'">
                    <div class="row">
						<div class="col-xs-12">
							<ul style="list-style:none;">
							<li>
							<label class="required"><xsl:call-template name="hp-label">
									<xsl:with-param name="code" select="'CaRefProduct'"/>
									<xsl:with-param name="language" select="$language"/>
								</xsl:call-template></label>
							</li>
							<li>
								<ul style="list-style: none;">
									<li>
									<label class="required"><xsl:call-template name="hp-label">
									<xsl:with-param name="code" select="'I_BrandName'"/>
									<xsl:with-param name="language" select="$language"/>
								</xsl:call-template>:&#160;</label>
									<span style="padding-left:3px;white-space:nowrap;"><xsl:value-of select="cdn_ref_product/brand_name"/></span>
									</li>
									<li>
									<label class="required"><xsl:call-template name="hp-label">
									<xsl:with-param name="code" select="'I_CompanyName'"/>
									<xsl:with-param name="language" select="$language"/>
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
        </section>
		</div>
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
		<scenario default="yes" name="Scenario1" userelativepaths="yes" externalpreview="yes" url="file:///e:/draftrepdo-0-2 (14).xml" htmlbaseurl="" outputurl="..\..\..\..\..\..\..\..\SPM\test\dossier.html" processortype="saxon8" useresolver="yes"
		          profilemode="0" profiledepth="" profilelength="" urlprofilexml="" commandline="" additionalpath="" additionalclasspath="" postprocessortype="none" postprocesscommandline="" postprocessadditionalpath="" postprocessgeneratedext=""
		          validateoutput="no" validator="internal" customvalidator="">
			<parameterValue name="language" value="'fra'"/>
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