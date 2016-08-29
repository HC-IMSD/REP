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
            .activity_enrol
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
				<xsl:if test="count(ACTIVITY_ENROL) &gt; 0"> <xsl:apply-templates select="ACTIVITY_ENROL"></xsl:apply-templates> </xsl:if>
			</body>
		</html>
	</xsl:template>
	
	<!-- Activity Enrolment -->
	<xsl:template match="ACTIVITY_ENROL">
		<h1>Regulatory Enrolment Process</h1>
		<section>
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h2 class="panel-title">Regulatory Activity Information</h2>
				</div>
				
				<div class="panel-body">
					<div class="well well-sm" >
						<div class="row">
							<div class="col-sm-099">
								<span class="labels"> Control Number </span>
								<span class="activity_enrol"> <xsl:apply-templates select="dsts_control_number" /> </span>
							</div>
						</div>
					</div>
					<br />
					<br />
					<br />
					<br />
					<br />
					
					<div class="row">
						<div class="col-sm-049">
							<span class="labels"> Company ID </span>
							<span class="activity_enrol"> <xsl:apply-templates select="company_id" /> </span>
						</div>
						<div class="col-sm-049">
							<span class="labels"> Dossier ID </span>
							<span class="activity_enrol"> <xsl:apply-templates select="dossier_id_prefix" /> <xsl:apply-templates select="dossier_id" /> </span>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-049">
							<span class="labels"> Regulatory Activity Lead </span>
							<span class="activity_enrol"> <xsl:apply-templates select="reg_activity_lead" /> </span>
						</div>
						<div class="col-sm-049">
							<span class="labels"> Regulatory Activity Type </span>
							<span class="activity_enrol"> <xsl:apply-templates select="reg_activity_type" /> </span>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-049">
							<span class="labels"> Fee Class </span>
							<span class="activity_enrol"> <xsl:apply-templates select="fee_class" /> </span>
						</div>
						<div class="col-sm-049">
							<span class="labels" style="visibility: hidden;"> . </span>
							<span class="labels">
								<xsl:element name="input">
									<xsl:attribute name="type">checkbox</xsl:attribute>
									<xsl:if test="not_lasa = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
									<xsl:attribute name="disabled">disabled</xsl:attribute>
								</xsl:element>
								I confirm that this administrative submission type is NOT a LASA submission.
							</span>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-099">
							<span class="labels"> Reason for filing this Regulatory Activity: </span>
							<span class="activity_enrol"> <xsl:apply-templates select="reason_filing" /> </span>
						</div>
					</div>
					
					<br />

					<xsl:for-each select="related_activity">
						<div class="panel panel-warning">
							<header class="panel-warning panel-heading" >
								<h3 class="panel-warning panel-title" > Related Regulatory Activity <xsl:value-of select="position()"/> </h3>
							</header>
							
							<div class="panel-warning panel-body">
								<div class="col-sm-099">
									<div class="well well-sm" >
										<div class="row">
											<div class="col-sm-099">
												<span class="labels"> Regulatory Activity Type: </span>
												<span class="activity_enrol"> <xsl:apply-templates select="reg_activity_type" /> </span>
											</div>
										</div>
										<div class="row">
											<div class="col-sm-032">
												<span class="labels"> Date Cleared: </span>
												<span class="activity_enrol"> <xsl:apply-templates select="date_cleared" /> </span>
											</div>
											<div class="col-sm-032">
												<span class="labels"> Control No. </span>
												<span class="activity_enrol"> <xsl:apply-templates select="control_number" /> </span>
											</div>
											<div class="col-sm-032">
												<span class="labels"> Dossier ID (Previously File No.) </span>
												<span class="activity_enrol"> <xsl:apply-templates select="dossier_id" /> </span>
											</div>
										</div>
										<div class="row">
											<div class="col-sm-099">
												<span class="labels"> Manufacturer / Sponsor Name [Full Legal Name - No Abbreviations] </span>
												<span class="activity_enrol"> <xsl:apply-templates select="manufacturer_name" /> </span>
											</div>
										</div>
										<div class="row">
											<div class="col-sm-099">
												<span class="labels"> Reason for Submissions </span>
												<span class="activity_enrol"> <xsl:apply-templates select="reason_filing" /> </span>
											</div>
										</div>
										<div class="row">
											<xsl:for-each select="assoc_dins/din_number">
												<div class="col-sm-024">
													<span class="labels"> Associated DIN </span>
													<span class="activity_enrol"> <xsl:value-of select="."/> </span>
												</div>
											</xsl:for-each>
										</div>
									</div>
								</div>
							</div>
						</div>
					</xsl:for-each>
				</div>		
			</div>
			
			<xsl:if test="((reg_activity_type = 'SNDS') or (reg_activity_type = 'SANDS') or (reg_activity_type = 'VINDS') or (reg_activity_type = 'VANDS') or (reg_activity_type = 'DIN') or (reg_activity_type = 'NC') or (reg_activity_type = 'VNC'))">
				<div class="panel panel-primary">
					<div class="panel-heading">
						<h2 class="panel-title">Drug Product Formulation Information</h2>
					</div>
					
					<div class="panel-body">
						<xsl:if test="((reg_activity_type = 'SNDS') or (reg_activity_type = 'SANDS') or (reg_activity_type = 'VINDS') or (reg_activity_type = 'VANDS') or (reg_activity_type = 'DIN'))">
							<h3 style="margin-left: 0.25%;"> Rationale for all SNDS, SANDS , (all human drug types); Veterinary Supplemental New Drug Submission (VSNDS), Veterinary Supplemental Abbreviated New Drug Submission (VSANDS) (all veterinary drug types); or for biological drug DIN submissions </h3>
							<div class="well well-sm" >
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="rationale_types/new_roa = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											New route of administration, dosage form and/or strength
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="rationale_types/new_claims = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											New claims/use, indications, recommended administration or dosage regime
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="rationale_types/change_formulation = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Change in formulation or method of manufacturing with clinical/bio data
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="rationale_types/change_drug_substance = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Change in drug substance/product (site, method, equipment, process control)
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="rationale_types/replace_sterility = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Replace sterility test with process parametric release
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="rationale_types/confirmitory_studies = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Confirmatory studies
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="rationale_types/other_rationale = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Other (please specify):
										</span>
									</div>
								</div>
								<xsl:if test="rationale_types/other_rationale = 'Y'">
									<div class="row">
										<div class="col-sm-099">
											<span class="labels"> Other Rationale Details: </span>
											<span class="activity_enrol"> <xsl:apply-templates select="rationale_types/other_rationale_details" /> </span>
										</div>
									</div>
								</xsl:if>
							</div>
						</xsl:if>
						
						<xsl:if test="((reg_activity_type = 'NC') or (reg_activity_type = 'VNC'))">
							<h3 style="margin-left: 0.25%;"> Type of Notifiable Change (NC) or Veterinary Notifiable Change (VNC) submission (if applicable) </h3>
							<div class="well well-sm" >
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="notifiable_change_types/text_label_change = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Change in text of labelling
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="notifiable_change_types/drug_substance_change = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Change in drug substance (source, synthesis)
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="notifiable_change_types/formulation_change = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Change in formulation
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="notifiable_change_types/specification_change = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Change in specifications (medicinal or non-medicinal ingredient, pharmaceutical form, analytical method)
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="notifiable_change_types/expiry_storage_change = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Change in expiry period/storage conditions
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="notifiable_change_types/manufact_method_change = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Change in manufacturing method
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="notifiable_change_types/manufact_site_change = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Change in manufacturing site
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="notifiable_change_types/container_size_change = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Change in container size for parenteral drug
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="notifiable_change_types/packaging_spec_change = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Change in packaging specifications for parenteral/inhalation drug
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="notifiable_change_types/packaging_materials_change = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Change in packaging material composition
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="notifiable_change_types/other_change = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Other (please specify):
										</span>
									</div>
								</div>
								<xsl:if test="notifiable_change_types/other_change = 'Y'">
									<div class="row">
										<div class="col-sm-099">
											<span class="labels"> Other Rationale Details: </span>
											<span class="activity_enrol"> <xsl:apply-templates select="notifiable_change_types/other_change_details" /> </span>
										</div>
									</div>
								</xsl:if>
							</div>
						</xsl:if>
					</div>		
				</div>
			</xsl:if>
			
			<br />
			
			<div class="panel panel-primary">
                <div class="panel-heading">
                    <h2 class="panel-title"> REP Contact Details </h2>
                </div>
                <div class="panel-body">
                    <xsl:for-each select="contact_record">
                        <div class="panel panel-warning">
                            <header class="panel-warning panel-heading" >
                                <h3 class="panel-warning panel-title" >
                                    <xsl:if test="rep_contact_role = 'PRIMARY'">Primary Contact</xsl:if>
									<xsl:if test="rep_contact_role = 'SECONDARY'">Secondary Contact</xsl:if>
                                </h3>
                            </header>
                            <div class="panel-warning panel-body">
                                <div class="col-sm-099">
                                    <div class="well well-sm" >
                                        <div class="row">
                                            <div class="col-sm-005">
                                                <span class="labels"> Salutation </span>
                                                <span class="activity_enrol">
                                                    <xsl:apply-templates select="rep_contact_details/salutation" />
                                                </span>
                                            </div>
                                            <div class="col-sm-021">
                                                <span class="labels"> Given Name </span>
                                                <span class="activity_enrol">
                                                    <xsl:apply-templates select="rep_contact_details/given_name" />
                                                </span>
                                            </div>
                                            <div class="col-sm-005">
                                                <span class="labels"> Initials </span>
                                                <span class="activity_enrol">
                                                    <xsl:apply-templates select="rep_contact_details/initials" />
                                                </span>
                                            </div>
                                            <div class="col-sm-021">
                                                <span class="labels"> Surname </span>
                                                <span class="activity_enrol">
                                                    <xsl:apply-templates select="rep_contact_details/surname" />
                                                </span>
                                            </div>
                                            <div class="col-sm-021">
                                                <span class="labels"> Job Title </span>
                                                <span class="activity_enrol">
                                                    <xsl:apply-templates select="rep_contact_details/job_title" />
                                                </span>
                                            </div>
                                            <div class="col-sm-021">
                                                <span class="labels"> Language Correspondence </span>
                                                <span class="activity_enrol">
                                                    <xsl:apply-templates select="rep_contact_details/language_correspondance" />
                                                </span>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-027">
                                                <span class="labels"> Phone Number </span>
                                                <span class="activity_enrol">
                                                    <xsl:apply-templates select="rep_contact_details/phone_num" />
                                                </span>
                                            </div>
                                            <div class="col-sm-016">
                                                <span class="labels"> Phone Extension </span>
                                                <span class="activity_enrol">
                                                    <xsl:apply-templates select="rep_contact_details/phone_ext" />
                                                </span>
                                            </div>
                                            <div class="col-sm-027">
                                                <span class="labels"> Fax Number </span>
                                                <span class="activity_enrol">
                                                    <xsl:apply-templates select="rep_contact_details/fax_num" />
                                                </span>
                                            </div>
                                            <div class="col-sm-027">
                                                <span class="labels"> Email </span>
                                                <span class="activity_enrol">
                                                    <xsl:apply-templates select="rep_contact_details/email" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </xsl:for-each>
                </div>
            </div>
			
			<div class="well well-sm" >
				<div class="row">
					<div class="col-sm-099">
						<span class="labels"> Will the submission be signed or filed by a third party on behalf of the manufacturer or sponsor? </span>
						<span class="activity_enrol"> <xsl:apply-templates select="is_third_party" /> </span>
					</div>
				</div>
			</div>
		</section>
	</xsl:template>
</xsl:stylesheet>