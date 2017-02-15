<div class="header">
    <div class="container">
        <div class="logo">
            <a class="navbar-brand"><img src="../../images/logo.jpg" alt="Brand"></a>
        </div>

        <div class="header-nav navbar " id="header-nav">
            <div class="staff">{staff}</div>
            <div class="navbar-header">
                <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
            <div class="navbar-collapse collapse" role="navigation">
                <ul class="nav navbar-nav">
                    {queue}
                </ul>
                <a class="custom-add" onclick="queueTools.addCustom();">+</a>
                <a class="custom-remove" onclick="queueTools.removeCustom();">-</a>
                <div class="menu-box">
                    <a class="contact-btn" onclick="queueTools.contact(this);">
                        <i class="icon icon-snan"></i>
                    </a>
                    <a class="exit-btn" onclick="queueTools.exit();">
                        <i class="icon icon-exit"></i>
                        退出
                    </a>
                </div>
            </div>
        </div>


    </div>
</div>