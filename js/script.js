$("#notification").hide();
setMode();
initBadgesList();

function setMode() {
    $.get("http://localhost:8080/mode", function(data) {
        switch (data) {
            case 'ADD':
                $("#currentMode").html("AJOUT DE BADGE");
                break;
            case 'DELETE':
                $("#currentMode").html("SUPPRESSION DE BADGE");
                break;
            default:
                $("#currentMode").html("OUVERTURE PORTE");
        }
    });
}

function notification(data) {
    $("#notification").html(data).show();
    setTimeout(function() {
        $("#notification").hide();
    }, 2500);
}

$("#readBtn").click(function() {
    $.get("http://localhost:8080/mode/READ", function(data) {
        setMode();
        // notification("Mode 'DEVEROUILLAGE' activé !");
    });
});

$("#addBtn").click(function() {
    $.get("http://localhost:8080/mode/ADD", function(data) {
        setMode();
        //notification("Mode 'AJOUT' activé !");
    });
});

$("#deleteBtn").click(function() {
    $.get("http://localhost:8080/mode/DELETE", function(data) {
        setMode();
        //notification("Mode 'SUPPRESSION' activé !");
    });
});

setInterval(function() {
    $.get("http://localhost:8080/log/last", function(data) {
        $("#lastLog").html(data);
    });
}, 1000);

$(".refresh_btn").click(function() {
    initBadgesList();
});

setInterval(function() {
    initBadgesList();
}, 30000);

function delBadge(code) {
    $.get("http://localhost:8080/delete/" + code, function(data) {});
    setTimeout(function() {
        initBadgesList();
    }, 500);
}

function changeNomPrenom(code) {
    nom = $(".inp_nom_" + code).val();
    prenom = $(".inp_prenom_" + code).val();
    $.get("http://localhost:8080/badges/" + code + "?nom=" + nom + "&prenom=" + prenom, function(data) {});
}

function initBadgesList() {
    $.get("http://localhost:8080/badges", function(data) {
        var table = "";
        jQuery.each(data, function() {
            table += "<tr><td>" + this["ID"] + "</td><td><input value=\"" + this["nom"] + "\"class=\"inp_nom_" + this["ID"] + "\" onkeyup=\"changeNomPrenom(" + this["ID"] + ")\"></input></td><td><input value=\"" + this["prenom"] + "\"class=\"inp_prenom_" + this["ID"] + "\" onkeyup=\"changeNomPrenom(" + this["ID"] + ")\"></input></td><td>" + this["ajout"] + "</td><td class=\"delete_badge\" onClick=\"delBadge(" + this["ID"] + ")\"> Supprimer </td></tr > ";
        });
        $("#badgesTable").html(table);
    });
}