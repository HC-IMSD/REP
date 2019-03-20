<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="CERTIFICATE_SUPPLEMENTARY_PROTECTION">

		<html lang="en">
			<head>
				<title>CSP Form</title>
				<style>table, th, td 
				{
   				 border: 1px solid black;
				 text-align: center ;
				 }
				 .col20 {
					  -webkit-column-count: 5; /* Chrome, Safari, Opera */
    				-moz-column-count: 5; /* Firefox */
    				column-count: 5;
					-moz-column-gap: 2em;
					-webkit-column-gap: 2em;
					column-gap: 2em
				}
				 .col4 {
					  -webkit-column-count: 4; /* Chrome, Safari, Opera */
    				-moz-column-count: 4; /* Firefox */
    				column-count: 4;
					-moz-column-gap: 2em;
					-webkit-column-gap: 2em;
					column-gap: 2em
				}

				div {
   				 display: block;
				}</style>
			</head>
			<body>
				<h1>Certificate of Supplementary Protection (CSP) Application Form</h1>
				<hr></hr>	
				<h2>Health Canada Only</h2>
				<p>
					<b>&#xA0;Date&#xA0;Application&#xA0;Recieved:</b>&#xA0;
					<xsl:value-of select="health_canada_only/date_received"/>
				</p>
				<p>
					<b>&#xA0;CSP&#xA0;Company&#xA0;Code:</b>&#xA0;
					<xsl:value-of select="health_canada_only/company_id"/>
				</p>
				<p>
					<b>&#xA0;CSP&#xA0;Application&#xA0;Number:</b>&#xA0;
					<xsl:value-of select="health_canada_only/application_id"/>
				</p>
				<p>
					<b>&#xA0;Notes:</b>&#xA0;
				</p>
				<p>
				<xsl:value-of select="health_canada_only/hc_notes"/>
				</p>
				<hr></hr>
				<h2>1. Contact Information</h2>
				<h3>Contacts</h3>
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
								<xsl:value-of select="address/street_address"/>
							</td>
							<td>
								<xsl:value-of select="address/city"/>
							</td>
							<td>
								<xsl:if test="address/province_lov!=''">
									<xsl:value-of select="address/province_lov"/>
								</xsl:if>
								<xsl:if test="address/province_text!=''">
									<xsl:value-of select="address/province_text"/>
								</xsl:if>
							</td>
							<td>
								<xsl:value-of select="address/country/@label_en"/>&#xA0;(<xsl:value-of select="address/country"/>)</td>
							<td>
								<xsl:value-of select="address/postal_code"/>
							</td>
						</tr>
					</xsl:for-each>
				</table>
				<hr></hr>
				<div>
					<h2>2. Patent Information</h2>
				</div>
				<div class="col4">

					<b>Patent&#xA0;Number:</b>&#xA0;
					<span>
						<xsl:value-of select="application_info/patent_info/patent_number"/>
					</span>

					<p>
						<b>&#xA0;Filing&#xA0;Date:</b>&#xA0;
						<xsl:value-of select="application_info/patent_info/filing_date"/>
					</p>
					<p>
						<b>Granted&#xA0;Date:</b>&#xA0;
						<xsl:value-of select="application_info/patent_info/granted_date"/>
					</p>
					<p>
						<b>Expiry&#xA0;Date:</b>&#xA0;
						<xsl:value-of select="application_info/patent_info/expiry_date"/>
					</p>
				</div>
				<hr></hr>
				<h2>3. New Drug Submission (NDS) Information</h2>
				<p>
					<b>NDS Number:&#xA0;</b>&#xA0;
					<xsl:value-of select="application_info/control_number"/>
				</p>
				<hr></hr>
				<h2>4. Drug Use</h2>
				<p>
					<xsl:apply-templates select="application_info/drug_use"/>
				</p>
				<hr></hr>
				<h2>5. Time of Application</h2>
				<p>
					<b>Applicant is applying:&#xA0;</b>&#xA0;
					<xsl:apply-templates select="application_info/time_application"/>
				</p>
				<hr></hr>
				<h2>6. Medicinal Ingredient</h2>
				<p>
					<xsl:value-of select="application_info/medicinal_ingredient"/>
				</p>
				<hr></hr>
				<h2>7. Statement</h2>
				<p>
					<b>Statements as to Applicant:&#xA0;</b>&#xA0;
					<xsl:apply-templates select="application_info/applicant_statement"/>
				</p>
				<p>
					<b>Statements as to timely submission:&#xA0;</b>&#xA0;
					<xsl:apply-templates select="timely_submission_info/timely_submission_statement"/>
				</p>

				<xsl:if test="timely_submission_info/marketing_approval_date!=''">
					<p>
						<b>Application Date:&#xA0;</b>&#xA0;
						<xsl:value-of select="timely_submission_info/marketing_approval_date"/>
					</p>
				</xsl:if>
				<xsl:if test="timely_submission_info/marketing_country!=''">
					<p>
						<b>Marketing Country:&#xA0;</b>&#xA0;
						<xsl:value-of select="timely_submission_info/marketing_country/@label_en"/>&#xA0;
						(<xsl:value-of select="timely_submission_info/marketing_country"/>)
						<!--<xsl:apply-templates select="timely_submission_info/marketing_country"/>--></p>
				</xsl:if>
				<hr></hr>
				<h2>8. Fee Payment</h2>
				<p>
					<b>Fee Payment Type:&#xA0;</b>&#xA0;
					<xsl:apply-templates select="advanced_payment/advanced_payment_type"/>
				</p>
				<p>
					The fee is being paid or the fee has been prepaid in the amount of $&#xA0;
					<xsl:value-of select="advanced_payment/advanced_payment_fee"/>
				</p>
				<hr></hr>
				<h2>9. Certification</h2>

				<table>
					<tr>
						<th style="width:15%">Given Name</th>
						<th style="width:5%">Initials</th>
						<th style="width:15%">Surname</th>
						<th style="width:15%">Job Title</th>
						<th style="width:10%">Signature Date</th>
					</tr>
					<tr>
						<td>

							<xsl:value-of select="certification/given_name"/>
						</td>
						<td>
							<xsl:value-of select="certification/initials"/>
						</td>
						<td>
							<xsl:value-of select="certification/surname"/>
						</td>
						<td>
							<xsl:value-of select="certification/job_title"/>
						</td>
						<td>
							<xsl:value-of select="certification/date_signed"/>
						</td>
					</tr>
				</table>
				<hr></hr>
				<div class="col20">
					<span>
						<b>Date Saved:&#xA0;</b>&#xA0;
						<xsl:value-of select="date_saved"/>
					</span>
					<p>
						<span>
							<b>Software Version:&#xA0;</b>&#xA0;
							<xsl:value-of select="software_version"/>
						</span>
					</p>
				</div>
				<hr></hr>
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
			<xsl:when test="current()='CHEQUE'">Cheque/Bank Draft/ Money Order</xsl:when>
			<xsl:when test="current()='WIRE'">Wire</xsl:when>
			<xsl:when test="current()='FINANCIAL'">Payment through a Canadian Financial Institution</xsl:when>
			<xsl:when test="current()='CREDIT_CARD'">MasterCard / Visa / American Express (AMEX) / Visa Debit / JCB International</xsl:when>
			<xsl:when test="current()='CREDIT'">Payment Using Existing Credit</xsl:when>
		</xsl:choose>
	</xsl:template>

	<xsl:template match="marketing_country">
		<xsl:choose>
			<xsl:when test="current()='EU_OTHER'">Any country that is a member in the EU</xsl:when>
			<xsl:when test="current()='USA'">U.S.A.</xsl:when>
			<xsl:when test="current()='JPN'">Japan</xsl:when>
			<xsl:when test="current()='AUS'">Australia</xsl:when>
			<xsl:when test="current()='CHE'">Switzerland</xsl:when>
			<xsl:when test="current()='EU'">European Union</xsl:when>
		</xsl:choose>
	</xsl:template>

	<xsl:template match="drug_use">
		<xsl:choose>
			<xsl:when test="current()='HUMAN'">Human</xsl:when>
			<xsl:when test="current()='VETERINARY'">Veterinary</xsl:when>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet><!-- Stylus Studio meta-information - (c) 2004-2009. Progress Software Corporation. All rights reserved.

<metaInformation>
	<scenarios>
		<scenario default="no" name="Scenario1" userelativepaths="yes" externalpreview="yes" url="..\..\..\..\Downloads\hccsp-1-0.xml" htmlbaseurl="" outputurl="tt.html" processortype="saxon8" useresolver="yes" profilemode="0" profiledepth=""
		          profilelength="" urlprofilexml="" commandline="" additionalpath="" additionalclasspath="" postprocessortype="none" postprocesscommandline="" postprocessadditionalpath="" postprocessgeneratedext="" validateoutput="no" validator="internal"
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
		<scenario default="yes" name="Scenario2" userelativepaths="yes" externalpreview="yes" url="hccsp-1-1.xml" htmlbaseurl="" outputurl="" processortype="saxon8" useresolver="yes" profilemode="0" profiledepth="" profilelength="" urlprofilexml=""
		          commandline="" additionalpath="" additionalclasspath="" postprocessortype="none" postprocesscommandline="" postprocessadditionalpath="" postprocessgeneratedext="" validateoutput="no" validator="internal" customvalidator="">
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