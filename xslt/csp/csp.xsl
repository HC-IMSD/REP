<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="CERTIFICATE_SUPPLEMENTARY_PROTECTION">

		<html lang="en">
			<head>
				<title>CSP Form</title>
				<style>table, th, td {
   				 border: 1px solid black;
				 text-align: center ;
				 }
				 .col20 {
     				-webkit-column-width: 20px; /* Chrome, Safari, Opera */
    				-moz-column-width: 20px; /* Firefox */
     				column-width: 20px;
					  -webkit-column-count: 3; /* Chrome, Safari, Opera */
    				-moz-column-count: 3; /* Firefox */
    				column-count: 3;
				}
				</style>
			</head>
			<body>
				<h1>Certificate of Supplementary Protection (CSP) Application Form</h1>
				<p>
					<b>Date Saved:</b>
					<xsl:value-of select="date_saved"/>
				</p>
				<p>
					<b>Software Version:</b>
					<xsl:value-of select="software_version"/>
				</p>
				<h2>1. Contact Information</h2>

				<table>
					<tr>
						<th style="width:5%">Type</th>
						<th style="width:3%">Salutation</th>
						<th style="width:6%">Given Name</th>
						<th style="width:4%">Initials</th>
						<th style="width:6%">Surname</th>
						<th style="width:5%">Title</th>
						<th style="width:6%">Phone</th>
						<th style="width:3%">Phone Ext</th>
						<th style="width:6%">Fax</th>
						<th style="width:5%">Email</th>
						<th style="width:3%">Language</th>
					</tr>
					<xsl:for-each select="applicant">
						<tr>
							<xsl:if test="applicant_role='Y'">
								<td>Applicant</td>
							</xsl:if>
							<xsl:if test="applicant_role='N'">
								<td>Billing</td>
							</xsl:if>
							<td>
								<xsl:apply-templates select="contact/salutation"/>
							</td>
							<td>
								<xsl:value-of select="contact/given_name"/>
							</td>
							<td>
								<xsl:value-of select="contact/initials"/>
							</td>
							<td>
								<xsl:value-of select="contact/surname"/>
							</td>
							<td>
								<xsl:value-of select="contact/title"/>
							</td>
							<td>
								<xsl:value-of select="contact/phone_num"/>
							</td>
							<td>
								<xsl:value-of select="contact/phone_ext"/>
							</td>
							<td>
								<xsl:value-of select="contact/fax_num"/>
							</td>
							<td>
								<xsl:value-of select="contact/email"/>
							</td>
							<td>
								<xsl:apply-templates select="contact/language_correspondance"/>
							</td>
						</tr>
					</xsl:for-each>
				</table>
				<h3>Addresses</h3>
				<table>
					<tr>
						<th style="width:5%">Type</th>
						<th style="width:10%">Street</th>
						<th style="width:7%">City</th>
						<th style="width:7%">State</th>
						<th style="width:7%">Country</th>
						<th style="width:5%">Postal</th>
					</tr>
					<xsl:for-each select="applicant">
						<tr>
							<xsl:if test="applicant_role='Y'">
								<td>Applicant</td>
							</xsl:if>
							<xsl:if test="applicant_role='N'">
								<td>Billing</td>
							</xsl:if>
							<td>
								<xsl:apply-templates select="address/street_address"/>
							</td>
							<td>
								<xsl:apply-templates select="address/city"/>
							</td>
							<td>
								<xsl:if test="address/province_lov!=''">
									<xsl:apply-templates select="address/province_lov"/>
								</xsl:if>
								<xsl:if test="address/province_text!=''">
									<xsl:value-of select="address/province_text"/>
								</xsl:if>
							</td>
							<td>
								<xsl:value-of select="address/country/@label_en"/>
							</td>
							<td>
								<xsl:value-of select="address/postal_code"/>
							</td>
						</tr>
					</xsl:for-each>
				</table>

				<!--
				<xsl:for-each select="applicant">

					<xsl:if test="applicant_role='Y'">
						<h3>
							<u>Applicant</u>
						</h3>
						<p>
							<b>Applicant Name:</b>
							<xsl:value-of select="applicant_name"/>
						</p>
					</xsl:if>
					<xsl:if test="applicant_role='N'">
						<h3>
							<u>Billing</u>
						</h3>
						<p>
							<b>Billing Company:</b>
							<xsl:value-of select="applicant_name"/>
						</p>
					</xsl:if>
					<p>
						<b>Salutation:</b>
						<xsl:apply-templates select="contact/salutation"/>
					</p>
					<p>
						<b>Given Name:</b>
						<xsl:value-of select="contact/given_name"/>
					</p>
					<p>
						<b>Initials:</b>
						<xsl:value-of select="contact/initials"/>
					</p>
					<p>
						<b>Surname:</b>
						<xsl:value-of select="contact/surname"/>
					</p>
					<p>
						<b>Title:</b>
						<xsl:value-of select="contact/title"/>
					</p>
					<p>
						<b>Phone:</b>
						<xsl:value-of select="contact/phone_num"/>
					</p>
					<p>
						<b>Phone Extension:</b>
						<xsl:value-of select="contact/phone_ext"/>
					</p>
					<p>
						<b>Fax:</b>
						<xsl:value-of select="contact/fax_num"/>
					</p>
					<p>
						<b>Email:</b>
						<xsl:value-of select="contact/email"/>
					</p>
					<p>
						<b>Language:</b>
						<xsl:apply-templates select="contact/language_correspondance"/>
					</p>
					<p>
						<b>Street:</b>
						<xsl:apply-templates select="address/street_address"/>
					</p>
					<p>
						<b>City:</b>
						<xsl:apply-templates select="address/City"/>
					</p>
					<xsl:if test="address/province_lov!=''">
						<p>
							<b>Province:</b>
							<xsl:apply-templates select="address/province_lov"/>
						</p>
					</xsl:if>
					<xsl:if test="address/province_text!=''">
						<p>
							<b>Province:</b>
							<xsl:value-of select="address/province_text"/>
						</p>
					</xsl:if>
					<p>
						<b>Country:</b>
						<xsl:value-of select="address/country/@label_en"/>
					</p>
					<p>
						<b>Postal Code:</b>
						<xsl:value-of select="address/postal_code"/>
					</p>
				</xsl:for-each>-->

				<h3>2. Patent Information</h3>
				 <div class="col20">
				
					<b>Patent Number:</b>
					<xsl:value-of select="application_info/patent_info/patent_number"/>
				
				
					<b>Filing Date:</b>
					<xsl:value-of select="application_info/patent_info/filing_date"/>
			
				</div>
				 <div class="col20">
				<p>
					<b>Filing Date:</b>
					<xsl:value-of select="application_info/patent_info/filing_date"/>
				</p>
				</div>
				<p>
					<b>Granted Date:</b>
					<xsl:value-of select="application_info/patent_info/granted_date"/>
				</p>
				<p>
					<b>Expiry Date:</b>
					<xsl:value-of select="application_info/patent_info/expiry_date"/>
				</p>

				<h3>3. New Drug Submission (NDS) Information</h3>
				<p>
					<b>NDS Number:</b>
					<xsl:value-of select="application_info/control_number"/>
				</p>
				<h3>4. Drug Use</h3>
				<p>
					<xsl:value-of select="application_info/drug_use"/>
				</p>
				<h3>5. Time of Application</h3>
				<p>
					<b>Applicant is applying:</b>
					<xsl:apply-templates select="application_info/time_application"/>
				</p>
				<h3>6. Medicinal Ingredient</h3>
				<p>
					<xsl:value-of select="application_info/medicinal_ingredient"/>
				</p>
				<h3>7. Statement</h3>
				<p>
					<b>Statements as to Applicant:</b>
					<xsl:apply-templates select="application_info/applicant_statement"/>
				</p>
				<p>
					<b>Statements as to timely submission:</b>
					<xsl:apply-templates select="timely_submission_info/timely_submission_statement"/>
				</p>

				<xsl:if test="timely_submission_info/marketing_approval_date!=''">
					<p>
						<b>Application Date:</b>
						<xsl:value-of select="timely_submission_info/marketing_approval_date"/>
					</p>
				</xsl:if>
				<xsl:if test="timely_submission_info/marketing_country!=''">
					<p>
						<b>Marketing Country:</b>
						<xsl:value-of select="timely_submission_info/marketing_country"/>
					</p>
				</xsl:if>
				<xsl:if test="timely_submission_info/marketing_country_eu!=''">
					<p>
						<b>Other European Country:</b>
						<xsl:value-of select="timely_submission_info/marketing_country_eu"/>
					</p>
				</xsl:if>
				<h3>8. Fee Payment</h3>
				<p>
					<b>Fee Payment Type:</b>
					<xsl:apply-templates select="advanced_payment/advanced_payment_type"/>
				</p>
				<p>
					<b>The fee is being paid or the fee has been prepaid in the amount of $</b>
					<xsl:value-of select="advanced_payment/advanced_payment_fee"/>
				</p>
				<h3>9. Certification</h3>
				<p>
					<b>Given Name:</b>
					<xsl:value-of select="certification/given_name"/>
				</p>
				<p>
					<b>Initials:</b>
					<xsl:value-of select="certification/initials"/>
				</p>
				<p>
					<b>Surname:</b>
					<xsl:value-of select="certification/surname"/>
				</p>
				<p>
					<b>Job Title:</b>
					<xsl:value-of select="certification/job_title"/>
				</p>
				<p>
					<b>Date Signed:</b>
					<xsl:value-of select="certification/date_signed"/>
				</p>
			</body>
		</html>
	</xsl:template>




	<xsl:template match="salutation">
		<xsl:choose>
			<xsl:when test="current()='SALUT_DR'">Dr.</xsl:when>
			<xsl:when test="current()='SALUT_MR'">Mr.</xsl:when>
			<xsl:when test="current()='SALUT_MRS'">Mrs.</xsl:when>
			<xsl:otherwise>No Value</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<xsl:template match="language_correspondance">
		<xsl:choose>
			<xsl:when test="current()='en'">English</xsl:when>
			<xsl:when test="current()='fr'">French</xsl:when>
			<xsl:otherwise>No Value</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template match="province_lov">
		<xsl:choose>
			<xsl:when test="current()='ON'">Ontario</xsl:when>
			<xsl:when test="current()='QC'">Quebec</xsl:when>
			<xsl:when test="current()='MB'">Manitoba</xsl:when>
		</xsl:choose>
	</xsl:template>

	<xsl:template match="time_application">
		<xsl:choose>
			<xsl:when test="current()='NOC'">within 120 days of the issuance of the Notice of Compliance (NOC) for the above noted NDS</xsl:when>
			<xsl:when test="current()='GRANT'">within 120 days of the grant of the above noted patent</xsl:when>
			<xsl:otherwise>None</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<xsl:template match="applicant_statement">
		<xsl:choose>
			<xsl:when test="current()='OWNER'">The Applicant is recorded as the owner of the above noted Canadian Patent at the Canadian Patent Office.</xsl:when>
			<xsl:when test="current()='BEHALF_OWNER'">The Applicant is applying on behalf of and with the consent of the owner of the above noted Canadian Patent as recorded at the Canadian Patent Office.</xsl:when>
		</xsl:choose>
	</xsl:template>

	<xsl:template match="timely_submission_statement">
		<xsl:choose>
			<xsl:when test="current()='NO_APPLICATION'">No application for a marketing approval equivalent to an authorization for sale with respect to the medicinal ingredient or combination of medicinal ingredients set out in this CSP application has been submitted in the United States, the European Union or any country that is a member of the European Union, Australia, Switzerland or Japan, before the application for the authorization for sale referred to in paragraph 106(1)(c) of the Patent Act (above noted NDS) was filed with the Minister of Health</xsl:when>
			<xsl:when test="current()='APPLICATION'">If an application for a marketing approval equivalent to an authorization for sale with respect to the medicinal ingredient or combination of medicinal ingredients set out in this CSP application has been submitted in the United States, the European Union or any country that is a member of the European Union, Australia, Switzerland or Japan, the application for the authorization for sale referred to in paragraph 106(1)(c) of the Patent Act (above noted NDS) was filed with the Minister of Health before the end of a period of one year that begins on the day on which the first such application for a marketing approval was submitted. Details of the first application for marketing approval are as follows:</xsl:when>
		</xsl:choose>
	</xsl:template>

	<xsl:template match="advanced_payment_type">
		<xsl:choose>
			<xsl:when test="current()='CHEQUE'">Cheque</xsl:when>
			<xsl:when test="current()='WIRE'">Wire</xsl:when>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet><!-- Stylus Studio meta-information - (c) 2004-2009. Progress Software Corporation. All rights reserved.

<metaInformation>
	<scenarios>
		<scenario default="yes" name="Scenario1" userelativepaths="yes" externalpreview="no" url="..\..\..\..\Downloads\hccsp-1-0.xml" htmlbaseurl="" outputurl="" processortype="saxon8" useresolver="yes" profilemode="0" profiledepth="" profilelength=""
		          urlprofilexml="" commandline="" additionalpath="" additionalclasspath="" postprocessortype="none" postprocesscommandline="" postprocessadditionalpath="" postprocessgeneratedext="" validateoutput="no" validator="internal"
		          customvalidator="">
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
		<MapperInfo srcSchemaPathIsRelative="yes" srcSchemaInterpretAsXML="no" destSchemaPath="" destSchemaRoot="" destSchemaPathIsRelative="yes" destSchemaInterpretAsXML="no">
			<SourceSchema srcSchemaPath="..\..\..\..\Downloads\hccsp-1-0.xml" srcSchemaRoot="CERTIFICATE_SUPPLEMENTARY_PROTECTION" AssociatedInstance="" loaderFunction="document" loaderFunctionUsesURI="no"/>
		</MapperInfo>
		<MapperBlockPosition>
			<template match="CERTIFICATE_SUPPLEMENTARY_PROTECTION"></template>
		</MapperBlockPosition>
		<TemplateContext></TemplateContext>
		<MapperFilter side="source"></MapperFilter>
	</MapperMetaTag>
</metaInformation>
-->