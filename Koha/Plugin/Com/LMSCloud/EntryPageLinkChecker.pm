package Koha::Plugin::Com::LMSCloud::EntryPageLinkChecker;

use 5.010;

use Modern::Perl;

use base qw(Koha::Plugins::Base);

use strict;
use warnings;
use utf8;
use Modern::Perl;
use English qw( -no_match_vars );

use Mojo::JSON qw(decode_json);

# use Koha::Plugin::Com::LMSCloud::EntryPageLinkChecker::Name::Of::Library;

our $VERSION = '{VERSION}';

our $METADATA = {
    name            => 'LMSEntryPageLinkChecker',
    author          => 'Paul Derscheid @ LMSCloud GmbH',
    description     => 'This plugin is used to check embedded searchengine queries on entry pages for valid results.',
    date_authored   => '2022-08-19',
    date_updated    => '1900-01-01',
    minimum_version => '21.05.14.000',
    maximum_version => undef,
};

our $VALID;    # used to check if booking still valid prior to insertion of new booking

sub new {
    my ( $class, $args ) = @_;

    ## We need to add our metadata here so our base class can access it
    $args->{'metadata'}              = $METADATA;
    $args->{'metadata'}->{'version'} = $VERSION;
    $args->{'metadata'}->{'class'}   = $class;

    ## Here, we call the 'new' method for our base class
    ## This runs some additional magic and checking
    ## and returns our actual $self
    my $self = $class->SUPER::new($args);

    return $self;
}

sub static_routes {
    my ( $self, $args ) = @_;

    my $spec_str = $self->mbf_read('staticapi.json');
    my $spec     = decode_json($spec_str);

    return $spec;
}

sub api_namespace {
    my ($self) = @_;

    return 'entrypagelinkchecker';
}

sub opac_head {
    my ($self) = @_;

    return <<~'EOF';
        <script type="text/javascript" src="/api/v1/contrib/entrypagelinkchecker/static/js/main.js"></script>
    EOF
}

sub opac_js {
    my ($self) = @_;

    return <<~"EOF";
        <script>
            console.log('EntryPageLinkChecker plugin loaded. Version $VERSION');
            EntryPageLinkCheckerBundle.testQueries();
        </script>
    EOF
}

1;
