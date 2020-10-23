$(function() {
    $("button").click(function() {
        console.log($(this).attr('value'));
        $(".loading-gif").show();
        $.post("http://localhost:5000/vote", {choice: $(this).attr('value')}, function() {
            console.log('done');
            $(".loading-gif").hide();

        });
    });
});