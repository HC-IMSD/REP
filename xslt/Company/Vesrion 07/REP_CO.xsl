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
				</script>
			</head>
            <body onload="addSelectBox();">
				<xsl:if test="count(COMPANY_ENROL) &gt; 0"> <xsl:apply-templates select="COMPANY_ENROL"></xsl:apply-templates> </xsl:if>
			</body>
		</html>
	</xsl:template>
	
	<!-- Company Enrolment -->
	<xsl:template match="COMPANY_ENROL">
		<h1><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'COMPANY_TEMPLATE'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></h1>
		<div class="well well-sm" >
			<TABLE border="1" cellspacing="2" cellpadding="2" style="table-layout: fixed; width: 100%;word-wrap: break-word;">
				<TR>
					<TD style="text-align: center;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'APPL_STATUS'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></TD>
					<TD style="text-align: center;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ENROL_VERSION'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></TD>
					<TD style="text-align: center;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'DATE_SAVED'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></TD>
					<TD style="text-align: center;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'COMPANY_ID'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></TD>
				</TR>
				<TR>
					<TD style="text-align: center;"> <xsl:apply-templates select="application_type" /> </TD>
					<TD style="text-align: center;"> <xsl:apply-templates select="enrolment_version" /> </TD>
					<TD style="text-align: center;"> <xsl:apply-templates select="date_saved" /> </TD>
					<TD style="text-align: center;"> <xsl:apply-templates select="company_id" /> </TD>
				</TR>
			</TABLE>
		</div>
		<section>
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h2 class="panel-title"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'REG_COMPANY_ENROL'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></h2>
				</div>
				
				<div class="panel-body">
					<section class="panel panel-default" >
							<div class="panel-heading">
								<h2 class="panel-title"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ADDR_RECO'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></h2>
							</div>
							<div class="panel-body">
							<TABLE border="1" cellspacing="2" cellpadding="2" style="width: 100%;word-wrap: break-word;">
								<TR>
									<TD style="text-align: center;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'COMPANY'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></TD>
									<TD style="text-align: center;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ADDR_INFO'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></TD>
									<TD style="text-align: center;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'IMP_COMP_ID'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></TD>
									<TD style="text-align: center;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ROLES'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></TD>
								</TR>
								<xsl:for-each select="address_record">
									<tr>
									<td style="padding-left:2px;"><span><xsl:value-of select="./company_name"/></span></td>
									<td style="padding-left:2px;"><xsl:call-template name="address"/></td>
									<td style="padding-left:2px;"><span><xsl:value-of select="./importer_id"/></span></td>
									<td style="padding-left:2px;"><span><xsl:call-template name="addressRoles"/></span></td>
									</tr>
								</xsl:for-each>
							</TABLE>
							</div>
					</section>
					<section class="panel panel-default" >
							<div class="panel-heading">
								<h2 class="panel-title"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'CONTACT_INFO'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></h2>
							</div>
							<div class="panel-body">
							<TABLE border="1" cellspacing="2" cellpadding="2" style="width: 100%;word-wrap: break-word;">
								<tr>
<!--									<td width="2%" aria-selected="false"></td>-->
									<td style="text-align: center;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'REPRES'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></td>
									<td style="text-align: center;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'CONTACT_BY'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></td>
									<td style="text-align: center;font-weight:bold;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'ROLES'"/><xsl:with-param name="language" select="$language"/></xsl:call-template></td>
								</tr>
								<xsl:for-each select="contact_record">
									<tr>
<!--										<td><span class="fa fa-lg fa-fw fa-caret-right"></span></td>-->
										<td style="padding-left:2px;"><span><xsl:call-template name="representative"/></span></td>
										<td style="padding-left:2px;"><span><xsl:call-template name="contactBy"/></span></td>
										<td style="padding-left:2px;"><span><xsl:call-template name="contactRoles"/></span></td>
									</tr>
								</xsl:for-each>
							</TABLE>
							</div>
					</section>
				</div>		
			</div>
		</section>
	</xsl:template>
	<xsl:template name="contactBy">
		<div class="oneLine">
			<div style="white-space:nowrap;"><label style="width:15em;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'LANGCORRESPOND'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:</label><span><xsl:call-template name="hp-label"><xsl:with-param name="code" select="./company_contact_details/language_correspondance"/><xsl:with-param name="language" select="$language"/></xsl:call-template></span></div>
			<div style="white-space:nowrap;"><label style="width:6em;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'PHONE'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:</label><span><xsl:value-of select="./company_contact_details/phone_num"/></span>&#160;
			<label><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'EXTENSION'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>&#160;</label><span><xsl:value-of select="./company_contact_details/phone_ext"/></span></div>
			<div style="white-space:nowrap;"><label style="width:6em;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'FAX'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:</label><span><xsl:value-of select="./company_contact_details/fax_num"/></span></div>
			<div style="white-space:nowrap;"><label style="width:6em;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'EMAIL'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:</label><span><xsl:value-of select="./company_contact_details/email"/></span></div>
		</div>
	</xsl:template>
	<xsl:template name="contactRoles">
		<div class="address">
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
		<div class="address">
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
		<div class="address">
			<xsl:element name="input">
                <xsl:attribute name="type">checkbox</xsl:attribute>
                <xsl:if test=" billing = 'Y'">
                    <xsl:attribute name="checked"></xsl:attribute>
                </xsl:if>
                <xsl:attribute name="disabled">disabled</xsl:attribute>
				<xsl:attribute name="style">float:left;width:25px;</xsl:attribute>
            </xsl:element>
			<span style="font-weight:normal;">
				<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'CONTACT_BILLING'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
			</span>
		</div>
		<div class="address">
			<xsl:element name="input">
                <xsl:attribute name="type">checkbox</xsl:attribute>
                <xsl:if test=" rep_primary = 'Y'">
                    <xsl:attribute name="checked"></xsl:attribute>
                </xsl:if>
                <xsl:attribute name="disabled">disabled</xsl:attribute>
				<xsl:attribute name="style">float:left;width:25px;</xsl:attribute>
            </xsl:element>
			<span style="font-weight:normal;">
				<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'REPPRIMARY'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
			</span>
		</div>
		<div class="address">
			<xsl:element name="input">
                <xsl:attribute name="type">checkbox</xsl:attribute>
                <xsl:if test=" rep_secondary = 'Y'">
                    <xsl:attribute name="checked"></xsl:attribute>
                </xsl:if>
                <xsl:attribute name="disabled">disabled</xsl:attribute>
				<xsl:attribute name="style">float:left;width:25px;</xsl:attribute>
            </xsl:element>
			<span style="font-weight:normal;">
				<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'REPSECONDARY'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
			</span>
		</div>
	</xsl:template>
	<xsl:template name="representative">
		<div style="white-space:nowrap;"><label style="width:6em;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'SALUTATION'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:</label><span><xsl:call-template name="hp-label"><xsl:with-param name="code" select="./company_contact_details/salutation"/><xsl:with-param name="language" select="$language"/></xsl:call-template></span></div>
		<div style="white-space:nowrap;"><label style="width:6em;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'FIRSTNAME'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:</label><span><xsl:value-of select="./company_contact_details/given_name"/></span></div>
		<div style="white-space:nowrap;"><label style="width:6em;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'INITIALS'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:</label><span><xsl:value-of select="./company_contact_details/initials"/></span></div>
		<div style="white-space:nowrap;"><label style="width:6em;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'LASTNAME'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:</label><span><xsl:value-of select="./company_contact_details/surname"/></span></div>
		<div style="white-space:nowrap;"><label style="width:6em;"><xsl:call-template name="hp-label"><xsl:with-param name="code" select="'JOBTITLE'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>:</label><span><xsl:value-of select="./company_contact_details/job_title"/></span></div>
	</xsl:template>
	<xsl:template name="address">
		<div class="addressContainer">
			<div class="address">
				<span class="value">
					<xsl:value-of select="./company_address_details/street_address"/>
				</span>
			</div>
			<div class="address" style="white-space:nowrap;">
				<span class="value"><xsl:value-of select="./company_address_details/city"/></span>, &#xA0;
				<span class="value">
					<xsl:choose>
					<xsl:when test="(./company_address_details/country = 'CAN') or (./company_address_details/country = 'USA')">
						<xsl:call-template name="hp-label"><xsl:with-param name="code" select="./company_address_details/province_lov"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="./company_address_details/province_lov"/>
					</xsl:otherwise>
					</xsl:choose>
				</span>&#xA0;
				<span class="value">
					<xsl:choose><xsl:when test="$language = 'fra'">
						<xsl:value-of select="./company_address_details/country/@label_fr"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="./company_address_details/country/@label_en"/>
					</xsl:otherwise>
					</xsl:choose>
				</span>&#xA0;
			</div>
			<div class="address">
				<xsl:value-of select="./company_address_details/postal_code"/>
			</div>
		</div>
	</xsl:template>
	<xsl:template name="addressRoles">
		<div class="address" style="white-space:nowrap;">
			<xsl:element name="input">
                <xsl:attribute name="type">checkbox</xsl:attribute>
                <xsl:if test=" manufacturer = 'Y'">
                    <xsl:attribute name="checked"></xsl:attribute>
                </xsl:if>
                <xsl:attribute name="disabled">disabled</xsl:attribute>
				<xsl:attribute name="style">float:left;width:25px;</xsl:attribute>
            </xsl:element>
			<span style="font-weight:normal;">
				<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'MANUFACT_SEL'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
			</span>
		</div>
		<div class="address" style="white-space:nowrap;">
			<xsl:element name="input">
                <xsl:attribute name="type">checkbox</xsl:attribute>
                <xsl:if test=" manufacturer = 'Y'">
                    <xsl:attribute name="checked"></xsl:attribute>
                </xsl:if>
                <xsl:attribute name="disabled">disabled</xsl:attribute>
				<xsl:attribute name="style">float:left;width:25px;</xsl:attribute>
            </xsl:element>
			<span style="font-weight:normal;">
				<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'MAIL_SEL'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
			</span>
		</div>
		<div class="address" style="white-space:nowrap;">
			<xsl:element name="input">
                <xsl:attribute name="type">checkbox</xsl:attribute>
                <xsl:if test=" manufacturer = 'Y'">
                    <xsl:attribute name="checked"></xsl:attribute>
                </xsl:if>
                <xsl:attribute name="disabled">disabled</xsl:attribute>
				<xsl:attribute name="style">float:left;width:25px;</xsl:attribute>
            </xsl:element>
			<span style="font-weight:normal;">
				<xsl:call-template name="hp-label"><xsl:with-param name="code" select="'BILLING_SEL'"/><xsl:with-param name="language" select="$language"/></xsl:call-template>
			</span>
		</div>
		<div class="address" style="white-space:nowrap;">
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
		<scenario default="yes" name="Scenario1" userelativepaths="no" externalpreview="yes" url="file:///e:/hcrepco-12345-1-0.xml" htmlbaseurl="" outputurl="file:///c:/SPM/test/company.html" processortype="saxon8" useresolver="yes" profilemode="0"
		          profiledepth="" profilelength="" urlprofilexml="" commandline="" additionalpath="" additionalclasspath="" postprocessortype="none" postprocesscommandline="" postprocessadditionalpath="" postprocessgeneratedext="" validateoutput="no"
		          validator="internal" customvalidator="">
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