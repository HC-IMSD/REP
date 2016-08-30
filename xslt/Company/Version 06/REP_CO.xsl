<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
<!-- <link rel="stylesheet" type="text/css" href="stylesheet.css"> -->
	<xsl:template match="/">
		<style type="text/css">
			html {
            height: auto !important;				
            }
            body{
            height: auto !important;
            }
            h1{
            font-family: Helvetica,Arial,sans-serif;
            color: black;
            }
            h2
            {
            font-family: Helvetica,Arial,sans-serif;
            font-size: 24;
            font-weight: 600;
            color: #fff;
            }
            h3
            {
            font-family: Helvetica,Arial,sans-serif;
            display:block;
            font-weight:bold;
            color:black;
            }
            h4
            {
            font-family: Helvetica,Arial,sans-serif;
            display:block;
            font-weight:bold;
            color:black;
            }
            .labels
            {
            display: block;
            color:black;
            background-color: inherit;
            font-family: Helvetica, Arial, sans-serif;
            font-weight: bold;
            }
            .company_enrol
            {
            display:block;
            color:black;
            background-color: white;
            border: 1px solid;
            font-family: Helvetica,Arial,sans-serif;
            height: auto;
            word-wrap: break-word;
            }
            .row{
            overflow:hidden;
            text-overflow:ellipsis;
            }
            .panel {
            margin-bottom: 0.65%;
            background-color: white;
            border: 1px solid transparent;
            border-radius: 4px;
            -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
            box-shadow: 0 1px 1px rgba(0,0,0,.05);
            height: auto;
            display: block;
            float: left;
            width: 100%;
            }
            .panel-primary {
            border-color: #0C5A9F;
            }
            .panel-primary {
            border-color: #2572b4;
            background-color: white;
            }
            .panel-heading {
            padding: 0.50% 0.75%;
            border-bottom: 1px solid transparent;
            border-top-right-radius: 3px;
            border-top-left-radius: 3px;
            background-color: #0C5A9F;
            border-color: #faeacc;
            }
            .panel-title {
            margin-top: 0;
            margin-bottom: 0;
            font-size: 20;
            color: white;
            }
            .panel-body {
            padding: 0.75%;
            display: block;
            }
            .panel-warning {
            border-color: #faeacc;
            }
            .panel-warning .panel-heading {
            color: #634615;
            background-color: #fcf8e3;
            border-color: #faeacc;
            }
            .panel-warning .panel-title {
            color: #634615;
            background-color: #fcf8e3;
            border-color: #faeacc;
            }
            .panel-warning .panel-body {
            padding: 0.75%;
            height: auto;
            display: block;
            }
            .well-sm {
            border-radius: 0.15%;
            }
            .well {
            float: left;
            width: 98.8%;
            padding: 0.50%;
            margin-bottom: 0.25%;
            background-color: #f5f5f5;
            border: 1px solid #e3e3e3;
            border-radius: 4px;
            -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
            box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
            }
            .col-sm-005 {
            width: 5.0%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
            .col-sm-008 {
            width: 8.0%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
            .col-sm-012 {
            width: 12.3%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
            .col-sm-016 {
            width: 16.10%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
            .col-sm-019 {
            width: 19.42%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
            .col-sm-021 {
            width: 21.65%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
            .col-sm-022 {
            width: 22.29%;
            float: left;
           padding: 0.25%;
            margin-bottom: 0.125%;
            }
            .col-sm-023 {
            width: 23.70%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
            .col-sm-024 {
            width: 24.43%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
            .col-sm-027 {
            width: 27.20%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
            .col-sm-032 {
            width: 32.77%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
            .col-sm-035 {
            width: 35.60%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
            .col-sm-036 {
            width: 36.68%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
            .col-sm-049 {
            width: 49.4%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }			
            .col-sm-074 {
            width: 74.50%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
			.col-sm-097 {
            width: 97.4%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
            .col-sm-099 {
            width: 99.4%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
		</style>

		<html>
			<body>
				<xsl:if test="count(COMPANY_ENROL) &gt; 0"> <xsl:apply-templates select="COMPANY_ENROL"></xsl:apply-templates> </xsl:if>
			</body>
		</html>
	</xsl:template>
	
	<!-- Company Enrolment -->
	<xsl:template match="COMPANY_ENROL">
		<h1>Regulatory Enrolment Process</h1>
		<section>
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h2 class="panel-title">Company Enrolment Information</h2>
				</div>
				
				<div class="panel-body">
					<div class="well well-sm" >
						<div class="row">
							<div class="col-sm-099">
								<span class="labels"> Company ID </span>
								<span class="company_enrol"> <xsl:apply-templates select="company_id" /> </span>
							</div>
						</div>
					</div>
					
					<br />

					<h3> Address Records </h3>
					
					<xsl:for-each select="address_record">
						<div class="panel panel-warning">
							<header class="panel-warning panel-heading" >
								<h3 class="panel-warning panel-title" > 
									Address <xsl:value-of select="position()"/>
									<xsl:if test="(manufacturer = 'Y') or (mailing = 'Y') or (billing = 'Y') or (importer = 'Y')">
										(<xsl:if test="manufacturer = 'Y'">Manufacturer/Sponsor</xsl:if>
										<xsl:if test="(manufacturer = 'Y') and ((mailing = 'Y') or (billing = 'Y') or (importer = 'Y'))">, </xsl:if>
										<xsl:if test="mailing = 'Y'">Mailing</xsl:if>
										<xsl:if test="(mailing = 'Y') and ((billing = 'Y') or (importer = 'Y'))">, </xsl:if>
										<xsl:if test="billing = 'Y'">Billing</xsl:if>
										<xsl:if test="(billing = 'Y') and (importer = 'Y')">, </xsl:if>
										<xsl:if test="importer = 'Y'">Canadian Importer</xsl:if>)
									</xsl:if>
								</h3>
							</header>
							
							<div>
							<div class="panel-warning panel-body">
								<div class="col-sm-099" >
									<h4> Company Information </h4>
									<div class="well well-sm" >
										<div class="row">
											<div class="col-sm-099">
												<span class="labels"> Company Name [Full Legal Name] </span>
												<span class="company_enrol"> <xsl:apply-templates select="company_name" /> </span>
											</div>
										</div>
									</div>
								</div>
																
								<div class="col-sm-099">
									<h4> Address Information </h4>
									<div class="well well-sm">
										<div class="row">
											<div class="col-sm-099">
												<span class="labels"> Street / Suite / P.O. Box </span>
												<span class="company_enrol"> <xsl:apply-templates select="company_address_details/street_address" /> </span>
											</div>
										</div>
										<div class="row">
											<div class="col-sm-024">
												<span class="labels"> City / Town </span>
												<span class="company_enrol"> <xsl:apply-templates select="company_address_details/city" /> </span>
											</div>
											<div class="col-sm-024">
												<span class="labels"> Province </span>
												<span class="company_enrol"> <xsl:choose><xsl:when test="(company_address_details/country = 'CAN') or (company_address_details/country = 'USA')"><xsl:apply-templates select="company_address_details/province_lov" /></xsl:when><xsl:otherwise><xsl:apply-templates select="company_address_details/province_text" /></xsl:otherwise></xsl:choose> </span>
											</div>
											<div class="col-sm-024">
												<span class="labels"> Country </span>
												<span class="company_enrol"> <xsl:apply-templates select="company_address_details/country" /> </span>
											</div>
											<div class="col-sm-024">
												<span class="labels"> Postal / ZIP Code </span>
												<span class="company_enrol"> <xsl:apply-templates select="company_address_details/postal_code" /> </span>
											</div>
										</div>
									</div>
								</div>

							</div>
							</div>
						</div>												
					</xsl:for-each>
					
					<h3> Contact Records </h3>
					
					<xsl:for-each select="contact_record">
						<div class="panel panel-warning">
							<header class="panel-warning panel-heading" >
								<h3 class="panel-warning panel-title" >
									Contact <xsl:value-of select="position()"/>
									<xsl:if test="(manufacturer = 'Y') or (mailing = 'Y') or (billing = 'Y') or (rep_contact_role = 'PRIMARY') or (rep_contact_role = 'SECONDARY')">
										(<xsl:if test="manufacturer = 'Y'">Manufacturer/Sponsor</xsl:if>
										<xsl:if test="(manufacturer = 'Y') and ((mailing = 'Y') or (billing = 'Y') or (rep_contact_role = 'PRIMARY') or (rep_contact_role = 'SECONDARY'))">, </xsl:if>
										<xsl:if test="mailing = 'Y'">Mailing</xsl:if>
										<xsl:if test="(mailing = 'Y') and ((billing = 'Y') or (rep_contact_role = 'PRIMARY') or (rep_contact_role = 'SECONDARY'))">, </xsl:if>
										<xsl:if test="billing = 'Y'">Billing</xsl:if>
										<xsl:if test="(billing = 'Y') and ((rep_contact_role = 'PRIMARY') or (rep_contact_role = 'SECONDARY'))">, </xsl:if>
										<xsl:if test="rep_contact_role = 'PRIMARY'">REP Primary</xsl:if>
										<xsl:if test="(rep_contact_role = 'PRIMARY') and (rep_contact_role = 'SECONDARY')">, </xsl:if>
										<xsl:if test="rep_contact_role = 'SECONDARY'">REP Secondary</xsl:if>)
									</xsl:if>
								</h3>
							</header>
							
							<div class="panel-warning panel-body">
								<div class="col-sm-099">
									<h4> Company Representative Information </h4>
									<div class="well well-sm" >
										<div class="row">
											<div class="col-sm-005">
												<span class="labels"> Salutation </span>
												<span class="company_enrol"> <xsl:apply-templates select="company_contact_details/salutation" /> </span>
											</div>
											<div class="col-sm-021">
												<span class="labels"> Given Name </span>
												<span class="company_enrol"> <xsl:apply-templates select="company_contact_details/given_name" /> </span>
											</div>
											<div class="col-sm-005">
												<span class="labels"> Initials </span>
												<span class="company_enrol"> <xsl:apply-templates select="company_contact_details/initials" /> </span>
											</div>
											<div class="col-sm-021">
												<span class="labels"> Surname </span>
												<span class="company_enrol"> <xsl:apply-templates select="company_contact_details/surname" /> </span>
											</div>
											<div class="col-sm-021">
												<span class="labels"> Job Title </span>
												<span class="company_enrol"> <xsl:apply-templates select="company_contact_details/job_title" /> </span>
											</div>
											<div class="col-sm-021">
												<span class="labels"> Language Correspondence </span>
												<span class="company_enrol"> <xsl:apply-templates select="company_contact_details/language_correspondance" /> </span>
											</div>
										</div>
										<div class="row">
											<div class="col-sm-027">
												<span class="labels"> Phone Number </span>
												<span class="company_enrol"> <xsl:apply-templates select="company_contact_details/phone_num" /> </span>
											</div>
											<div class="col-sm-016">
												<span class="labels"> Phone Extension </span>
												<span class="company_enrol"> <xsl:apply-templates select="company_contact_details/phone_ext" /> </span>
											</div>
											<div class="col-sm-027">
												<span class="labels"> Fax Number </span>
												<span class="company_enrol"> <xsl:apply-templates select="company_contact_details/fax_num" /> </span>
											</div>
											<div class="col-sm-027">
												<span class="labels"> Email </span>
												<span class="company_enrol"> <xsl:apply-templates select="company_contact_details/email" /> </span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</xsl:for-each>
				</div>		
			</div>
		</section>
	</xsl:template>
</xsl:stylesheet>