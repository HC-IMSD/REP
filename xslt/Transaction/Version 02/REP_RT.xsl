<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
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
            .transaction_enrol
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
				<xsl:if test="count(TRANSACTION_ENROL) &gt; 0"> <xsl:apply-templates select="TRANSACTION_ENROL"></xsl:apply-templates> </xsl:if>
			</body>
		</html>
	</xsl:template>
	
	<!-- Transaction Enrolment -->
	<xsl:template match="TRANSACTION_ENROL">
		<h1>Regulatory Enrolment Process</h1>
		<section>
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h2 class="panel-title">Transaction Information</h2>
				</div>
				
				<div class="panel-body">										
					<xsl:if test="is_ectd = 'Y'">
						<div class="well well-sm" >
							<!--
							<div class="row">
								<div class="col-sm-099">
									<span class="labels"> Is this an eCTD transaction? </span>
									<span class="transaction_enrol"> <xsl:apply-templates select="is_ectd" /> </span>
								</div>
							</div>
							-->
							
							<div class="panel panel-warning">
								<header class="panel-warning panel-heading" >
									<h3 class="panel-warning panel-title" > Life Cycle Management Table </h3>
								</header>								
								
								<div class="panel-warning panel-body" >
									<TABLE border="1" cellspacing="2" cellpadding="2" style="table-layout: fixed; width: 100%">
										<TR>
											<TD style="word-wrap: break-word"> <span class="labels" style="text-align: center;"> Company ID </span> </TD>
											<TD style="word-wrap: break-word"> <span class="labels" style="text-align: center;"> Dossier Name </span> </TD>
											<TD style="word-wrap: break-word"> <span class="labels" style="text-align: center;"> Dossier ID </span> </TD>
										</TR>
										<TR>
											<TD style="word-wrap: break-word; text-align: center;"> <xsl:apply-templates select="company_id" /> </TD>
											<TD style="word-wrap: break-word; text-align: center;"> <xsl:apply-templates select="dossier_name" /> </TD>
											<TD style="word-wrap: break-word; text-align: center;"> <xsl:apply-templates select="dossier_id" /> </TD>
										</TR>
									</TABLE>
									<TABLE border="1" cellspacing="2" cellpadding="2" style="table-layout: fixed; width: 100%">
										<TR>
											<TD style="word-wrap: break-word" width="10%"> <span class="labels" style="text-align: center;"> Sequence Number </span> </TD>
											<TD style="word-wrap: break-word" width="10%"> <span class="labels" style="text-align: center;"> Date Submitted </span> </TD>
											<TD style="word-wrap: break-word" width="10%"> <span class="labels" style="text-align: center;"> Control Number </span> </TD>
											<TD style="word-wrap: break-word" width="10%"> <span class="labels" style="text-align: center;"> Regulatory Activity </span> </TD>
											<TD style="word-wrap: break-word" width="60%"> <span class="labels" style="text-align: center;"> Sequence Description </span> </TD>
										</TR>
										
										<xsl:for-each select="lifecycle_record">
											<TR>
											<TD style="word-wrap: break-word; text-align: center;" width="10%"> <xsl:apply-templates select="sequence_number" /> </TD>
											<TD style="word-wrap: break-word; text-align: center;" width="10%"> <xsl:apply-templates select="date_submitted" /> </TD>
											<TD style="word-wrap: break-word; text-align: center;" width="10%"> <xsl:apply-templates select="control_number" /> </TD>
											<TD style="word-wrap: break-word; text-align: center;" width="10%"> <xsl:apply-templates select="sequence_activity_type" /> </TD>
											<TD style="word-wrap: break-word" width="60%"> <xsl:apply-templates select="sequence_concat" /> </TD>
											</TR>
										</xsl:for-each>
									</TABLE>
								</div>
							</div>
						</div>
						
					</xsl:if>

					<div class="well well-sm" >
						<div class="row">
							<div class="col-sm-049">
								<span class="labels"> Is this solicited information? </span>
								<span class="transaction_enrol"> <xsl:apply-templates select="is_solicited" /> </span>
							</div>
							<xsl:if test="is_solicited = 'Y'">
								<div class="col-sm-049">
									<span class="labels"> Requester of Solicited Information </span>
									<span class="transaction_enrol"> <xsl:apply-templates select="solicited_requester" /> </span>
								</div>
							</xsl:if>
						</div>
					</div>
					
					<h4> Name of Regulatory Project Manager [if known]: </h4>
					
					<div class="well well-sm" >
						<div class="row">
							<div class="col-sm-049">
								<span class="labels"> Project Manager Name 1 </span>
								<span class="transaction_enrol"> <xsl:apply-templates select="regulatory_project_manager1" /> </span>
							</div>
							<div class="col-sm-049">
								<span class="labels"> Project Manager Name 2 </span>
								<span class="transaction_enrol"> <xsl:apply-templates select="regulatory_project_manager2" /> </span>
							</div>
						</div>
					</div>

				</div>		
			</div>
			
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h2 class="panel-title">Regulatory Activity Contact [for THIS Regulatory Activity]</h2>
				</div>
				
				<div class="panel-body">
					<div class="panel panel-warning">
						<header class="panel-warning panel-heading" >
							<h3 class="panel-warning panel-title" > Company Information: </h3>
						</header>
						
						<div class="panel-warning panel-body" >
							<div class="well well-sm" >
								<div class="row">
									<div class="col-sm-099">
										<span class="labels"> Company Name [Full Legal Name] </span>
										<span class="transaction_enrol"> <xsl:apply-templates select="company_name" /> </span>
									</div>
								</div>
							</div>

						</div>
					</div>
					
					<div class="panel panel-warning">
						<header class="panel-warning panel-heading" >
							<h3 class="panel-warning panel-title" > Address Information: </h3>
						</header>
						<div class="panel-warning panel-body" >
							<div class="well well-sm" >
								<div class="row">
									<div class="col-sm-099">
										<span class="labels"> Street / Suite </span>
										<span class="transaction_enrol"> <xsl:apply-templates select="regulatory_activity_address/street_address" /> </span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-024">
										<span class="labels"> City / Town </span>
										<span class="transaction_enrol"> <xsl:apply-templates select="regulatory_activity_address/city" /> </span>
									</div>
									<div class="col-sm-024">
										<span class="labels"> Province </span>
										<span class="transaction_enrol"> <xsl:choose><xsl:when test="(regulatory_activity_address/country = 'CAN') or (regulatory_activity_address/country = 'USA')"><xsl:apply-templates select="regulatory_activity_address/province_lov" /></xsl:when><xsl:otherwise><xsl:apply-templates select="regulatory_activity_address/province_text" /></xsl:otherwise></xsl:choose> </span>
									</div>
									<div class="col-sm-024">
										<span class="labels"> Country </span>
										<span class="transaction_enrol"> <xsl:apply-templates select="regulatory_activity_address/country" /> </span>
									</div>
									<div class="col-sm-024">
										<span class="labels"> Postal / ZIP Code </span>
										<span class="transaction_enrol"> <xsl:apply-templates select="regulatory_activity_address/postal_code" /> </span>
									</div>
								</div>
							</div>

						</div>
					</div>
					
					<div class="panel panel-warning">
						<header class="panel-warning panel-heading" >
							<h3 class="panel-warning panel-title" > Company Representative [for THIS Regulatory Activity]: </h3>
						</header>
						<div class="panel-warning panel-body" >
							<div class="well well-sm" >
								<div class="row">
									<div class="col-sm-005">
										<span class="labels"> Salutation </span>
										<span class="transaction_enrol"> <xsl:apply-templates select="regulatory_activity_contact/salutation" /> </span>
									</div>
									<div class="col-sm-021">
										<span class="labels"> Given Name </span>
										<span class="transaction_enrol"> <xsl:apply-templates select="regulatory_activity_contact/given_name" /> </span>
									</div>
									<div class="col-sm-005">
										<span class="labels"> Initials </span>
										<span class="transaction_enrol"> <xsl:apply-templates select="regulatory_activity_contact/initials" /> </span>
									</div>
									<div class="col-sm-021">
										<span class="labels"> Surname </span>
										<span class="transaction_enrol"> <xsl:apply-templates select="regulatory_activity_contact/surname" /> </span>
									</div>
									<div class="col-sm-021">
										<span class="labels"> Job Title </span>
										<span class="transaction_enrol"> <xsl:apply-templates select="regulatory_activity_contact/job_title" /> </span>
									</div>
									<div class="col-sm-021">
										<span class="labels"> Language Correspondence </span>
										<span class="transaction_enrol"> <xsl:apply-templates select="regulatory_activity_contact/language_correspondance" /> </span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-027">
										<span class="labels"> Phone Number </span>
										<span class="transaction_enrol"> <xsl:apply-templates select="regulatory_activity_contact/phone_num" /> </span>
									</div>
									<div class="col-sm-016">
										<span class="labels"> Phone Extension </span>
										<span class="transaction_enrol"> <xsl:apply-templates select="regulatory_activity_contact/phone_ext" /> </span>
									</div>
									<div class="col-sm-027">
										<span class="labels"> Fax Number </span>
										<span class="transaction_enrol"> <xsl:apply-templates select="regulatory_activity_contact/fax_num" /> </span>
									</div>
									<div class="col-sm-027">
										<span class="labels"> Email </span>
										<span class="transaction_enrol"> <xsl:apply-templates select="regulatory_activity_contact/email" /> </span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>		
			</div>
		</section>
	</xsl:template>
</xsl:stylesheet>